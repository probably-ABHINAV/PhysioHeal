"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import { 
  CalendarDays, 
  Users, 
  TrendingUp, 
  Clock, 
  Filter,
  Download,
  MessageCircle,
  RefreshCw,
  BarChart3,
  PieChart,
  Activity,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Calendar,
  Phone
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { StatCard } from "./stat-card"
import { AppointmentsGraph } from "./appointments-graph"
import { PatientHistoryTable } from "./patient-history-table"
import { FollowUpTracker } from "./follow-up-tracker"
import { TimelineChart } from "./timeline-chart"
import { FilterPanel } from "./filter-panel"
import { WhatsAppCTA } from "./whatsapp-cta"
import { ReviewsManagement } from "./reviews-management"
import { useAdminData } from "@/lib/use-admin-data"
import { useRealtime } from "@/lib/use-realtime"

interface AdminDashboardProps {
  user: any
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    dateRange: '7d',
    status: 'all',
    doctor: 'all'
  })

  // Check if user is authorized admin
  const isAuthorizedAdmin = user?.email === 'xoxogroovy@gmail.com'

  if (!isAuthorizedAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-red-800 mb-2">Access Denied</h3>
            <p className="text-red-600 mb-4">You are not authorized to access the admin dashboard.</p>
            <p className="text-sm text-red-500">Please contact the system administrator.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { toast } = useToast()
  const { data, loading, error, refetch } = useAdminData(filters)
  const { isConnected, lastUpdate } = useRealtime(['appointments', 'messages'], refetch)

  useEffect(() => {
    if (lastUpdate) {
      toast({
        title: "Real-time Update",
        description: "Dashboard data refreshed automatically",
        duration: 2000
      })
    }
  }, [lastUpdate])

  const handleExport = (format: 'csv' | 'pdf') => {
    toast({
      title: `Exporting ${format.toUpperCase()}`,
      description: "Your report will be downloaded shortly",
    })
    // Export functionality would be implemented here
  }

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-lg">Loading dashboard...</span>
        </div>
      </div>
    )
  }

  // Ensure we have data before rendering
  const dashboardData = data || {
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
    appointmentStats: { completed: 0, pending: 0, noShows: 0 },
    followUps: [],
    timelineData: []
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-red-800 mb-2">Dashboard Error</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={refetch} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground flex items-center gap-2 mt-1">
            Real-time clinic analytics and patient management
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-xs">{isConnected ? 'Live' : 'Offline'}</span>
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>

          <Button
            variant="outline"
            onClick={refetch}
            disabled={loading}
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>

          <Button
            onClick={() => handleExport('csv')}
            className="flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <FilterPanel
            filters={filters}
            onFiltersChange={setFilters}
            onClose={() => setIsFilterOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Bookings"
          value={dashboardData.stats.totalBookings}
          icon={CalendarDays}
          trend={dashboardData.stats.bookingsTrend}
          color="blue"
        />
        <StatCard
          title="Active Patients"
          value={dashboardData.stats.activePatients}
          icon={Users}
          trend={dashboardData.stats.patientsTrend}
          color="green"
        />
        <StatCard
          title="Follow-ups Pending"
          value={dashboardData.stats.pendingFollowUps}
          icon={Clock}
          trend={dashboardData.stats.followUpsTrend}
          color="orange"
          urgent={dashboardData.stats.pendingFollowUps > 10}
        />
        <StatCard
          title="Repeat Patients"
          value={`${dashboardData.stats.repeatPatientRate}%`}
          icon={TrendingUp}
          trend={dashboardData.stats.repeatTrend}
          color="purple"
        />
        <StatCard
          title="Revenue Today"
          value={`₹${dashboardData.stats.todayRevenue}`}
          icon={BarChart3}
          trend={dashboardData.stats.revenueTrend}
          color="emerald"
        />
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6 lg:w-fit lg:grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="patients" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Patients</span>
          </TabsTrigger>
          <TabsTrigger value="appointments" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Appointments</span>
          </TabsTrigger>
          <TabsTrigger value="followups" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Follow-ups</span>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Timeline</span>
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Reviews</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AppointmentsGraph data={dashboardData.chartData} />
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-blue-600" />
                  Patient Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      New Patients
                    </span>
                    <Badge variant="secondary">{dashboardData.stats.newPatients}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      Returning Patients
                    </span>
                    <Badge variant="secondary">{dashboardData.stats.returningPatients}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full" />
                      Chronic Cases
                    </span>
                    <Badge variant="secondary">{dashboardData.stats.chronicCases}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next 5 Patients Sidebar */}
          <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-600" />
                Next 5 Patients Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dashboardData.nextPatients.slice(0, 5).map((patient: any, index: number) => (
                  <motion.div
                    key={patient.id || `patient-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border"
                  >
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">{patient.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{patient.time}</p>
                      <WhatsAppCTA phone={patient.phone} name={patient.name} />
                    </div>
                  </motion.div>
                ))}
                {dashboardData.nextPatients.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">
                    No appointments scheduled for today
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <PatientHistoryTable 
            data={dashboardData.patients} 
            onStatusUpdate={refetch}
          />
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed Today</p>
                    <p className="text-2xl font-bold text-green-600">
                      {dashboardData.appointmentStats.completed}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {dashboardData.appointmentStats.pending}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <XCircle className="h-8 w-8 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">No Shows</p>
                    <p className="text-2xl font-bold text-red-600">
                      {dashboardData.appointmentStats.noShows}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <PatientHistoryTable 
            data={dashboardData.appointments} 
            onStatusUpdate={refetch}
            view="appointments"
          />
        </TabsContent>

        <TabsContent value="followups" className="space-y-4">
          <FollowUpTracker 
            data={dashboardData.followUps} 
            onUpdate={refetch}
          />
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <TimelineChart data={dashboardData.timelineData} />
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <ReviewsManagement onUpdate={refetch} />
        </TabsContent>
      </Tabs>
    </div>
  )
}