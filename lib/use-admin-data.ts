
"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface AdminDataFilters {
  dateRange: string
  status: string
  doctor: string
}

export function useAdminData(filters: AdminDataFilters) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClientComponentClient()

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Calculate date range
      const now = new Date()
      let startDate = new Date()
      
      switch (filters.dateRange) {
        case '1d':
          startDate.setDate(now.getDate() - 1)
          break
        case '7d':
          startDate.setDate(now.getDate() - 7)
          break
        case '30d':
          startDate.setDate(now.getDate() - 30)
          break
        case '90d':
          startDate.setDate(now.getDate() - 90)
          break
        default:
          startDate.setDate(now.getDate() - 7)
      }

      // Build query conditions
      let appointmentsQuery = supabase
        .from('appointments')
        .select('*')
        .gte('created_at', startDate.toISOString())

      if (filters.status !== 'all') {
        appointmentsQuery = appointmentsQuery.eq('status', filters.status)
      }

      if (filters.doctor !== 'all') {
        appointmentsQuery = appointmentsQuery.eq('doctor', filters.doctor)
      }

      // Fetch appointments
      const { data: appointments, error: appointmentsError } = await appointmentsQuery
        .order('created_at', { ascending: false })

      if (appointmentsError) throw appointmentsError

      // Fetch messages
      const { data: messages, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false })

      if (messagesError) throw messagesError

      // Process data and calculate stats
      const processedData = processAdminData(appointments || [], messages || [], filters)
      
      setData(processedData)
    } catch (err) {
      console.error('Error fetching admin data:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
      
      // Provide sample data on error
      setData(getSampleAdminData())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [filters])

  return { data, loading, error, refetch: fetchData }
}

function processAdminData(appointments: any[], messages: any[], filters: AdminDataFilters) {
  const now = new Date()
  const today = now.toISOString().split('T')[0]

  // Calculate basic stats
  const totalBookings = appointments.length
  const activePatients = new Set(appointments.map(a => a.email)).size
  const completedToday = appointments.filter(a => 
    a.status === 'completed' && a.preferred_date === today
  ).length
  
  const pendingFollowUps = appointments.filter(a => 
    a.follow_up_date && new Date(a.follow_up_date) <= now && a.status !== 'completed'
  ).length

  // Calculate trends based on actual data
  const bookingsTrend = 0 // Will be calculated when historical data is available
  const patientsTrend = 0
  const followUpsTrend = 0
  const repeatTrend = 0
  const revenueTrend = 0

  // Calculate additional stats
  const newPatients = appointments.filter(a => !a.is_returning).length
  const returningPatients = appointments.filter(a => a.is_returning).length
  const chronicCases = appointments.filter(a => 
    a.show_flags?.includes('chronic')
  ).length
  
  const repeatPatientRate = totalBookings > 0 
    ? Math.round((returningPatients / totalBookings) * 100) 
    : 0

  // Generate chart data
  const chartData = generateChartData(appointments)
  
  // Get next patients for today
  const nextPatients = appointments
    .filter(a => {
      const appointmentDate = new Date(a.preferred_time).toISOString().split('T')[0]
      return appointmentDate === today && a.status === 'pending'
    })
    .sort((a, b) => new Date(a.preferred_time).getTime() - new Date(b.preferred_time).getTime())
    .slice(0, 5)
    .map(a => ({
      ...a,
      time: new Date(a.preferred_time).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    }))

  // Calculate appointment stats
  const appointmentStats = {
    completed: appointments.filter(a => a.status === 'completed').length,
    pending: appointments.filter(a => a.status === 'pending').length,
    noShows: appointments.filter(a => a.status === 'no-show').length
  }

  // Generate follow-ups data
  const followUps = appointments
    .filter(a => a.follow_up_date)
    .map(a => ({
      id: a.id,
      patient_name: a.name,
      phone: a.phone,
      follow_up_date: a.follow_up_date,
      last_appointment: a.created_at,
      reason: a.reason || 'Regular follow-up',
      urgency: a.show_flags?.includes('chronic') ? 'high' : 'medium',
      status: 'pending',
      notes: a.notes
    }))

  // Generate timeline data
  const timelineData = appointments
    .filter(a => a.preferred_date === today)
    .map(a => ({
      id: a.id,
      time: a.preferred_time || '00:00',
      patient_name: a.name,
      type: 'appointment',
      status: a.status === 'completed' ? 'completed' : 
              a.status === 'pending' ? 'upcoming' : a.status,
      duration: 60,
      doctor: a.doctor
    }))
    .sort((a, b) => a.time.localeCompare(b.time))

  return {
    stats: {
      totalBookings,
      activePatients,
      pendingFollowUps,
      repeatPatientRate,
      todayRevenue: 0,
      bookingsTrend,
      patientsTrend,
      followUpsTrend,
      repeatTrend,
      revenueTrend,
      newPatients,
      returningPatients,
      chronicCases
    },
    chartData,
    patients: appointments,
    appointments,
    nextPatients,
    appointmentStats,
    followUps,
    timelineData
  }
}

function generateChartData(appointments: any[]) {
  const last7Days = []
  const now = new Date()
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    
    const dayAppointments = appointments.filter(a => {
      const appointmentDate = new Date(a.preferred_time).toISOString().split('T')[0]
      const createdDate = a.created_at.split('T')[0]
      return appointmentDate === dateStr || createdDate === dateStr
    })
    
    last7Days.push({
      date: dateStr,
      appointments: dayAppointments.length,
      completed: dayAppointments.filter(a => a.status === 'completed').length,
      cancelled: dayAppointments.filter(a => a.status === 'cancelled').length
    })
  }
  
  return last7Days
}

function getSampleAdminData() {
  return {
    stats: {
      totalBookings: 0,
      activePatients: 0,
      pendingFollowUps: 0,
      repeatPatientRate: 0,
      todayRevenue: 0,
      bookingsTrend: 0,
      patientsTrend: 0,
      followUpsTrend: 0,
      repeatTrend: 0,
      revenueTrend: 0,
      newPatients: 0,
      returningPatients: 0,
      chronicCases: 0
    },
    chartData: [],
    patients: [],
    appointments: [],
    nextPatients: [],
    appointmentStats: {
      completed: 0,
      pending: 0,
      noShows: 0
    },
    followUps: [],
    timelineData: []
  }
}
