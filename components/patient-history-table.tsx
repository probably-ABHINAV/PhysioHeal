
"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MoreHorizontal, 
  Phone, 
  MessageCircle, 
  Edit, 
  Calendar,
  Clock,
  User,
  Filter,
  Search,
  ChevronDown
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { WhatsAppCTA } from "./whatsapp-cta"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useToast } from "@/hooks/use-toast"

interface Patient {
  id: string
  name: string
  phone: string
  email?: string
  status: string
  reason?: string
  created_at: string
  preferred_date?: string
  preferred_time?: string
  doctor?: string
  notes?: string
  is_returning?: boolean
  follow_up_date?: string
  show_flags?: string[]
}

interface PatientHistoryTableProps {
  data: Patient[]
  onStatusUpdate?: () => void
  view?: 'patients' | 'appointments'
}

export function PatientHistoryTable({ data = [], onStatusUpdate, view = 'patients' }: PatientHistoryTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("created_at")
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  // Sample data if none provided
  const sampleData: Patient[] = [
    {
      id: '1',
      name: 'Riya Sharma',
      phone: '+919876543210',
      email: 'riya@example.com',
      status: 'completed',
      reason: 'Back pain physiotherapy',
      created_at: new Date().toISOString(),
      preferred_date: new Date().toISOString().split('T')[0],
      preferred_time: '10:00',
      doctor: 'Dr. Patel',
      is_returning: false,
      show_flags: ['new']
    },
    {
      id: '2',
      name: 'Amit Kumar',
      phone: '+919876543211',
      email: 'amit@example.com',
      status: 'pending',
      reason: 'Knee rehabilitation',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      preferred_date: new Date().toISOString().split('T')[0],
      preferred_time: '14:00',
      doctor: 'Dr. Singh',
      is_returning: true,
      follow_up_date: new Date(Date.now() + 7 * 86400000).toISOString(),
      show_flags: ['returning', 'chronic']
    },
    {
      id: '3',
      name: 'Priya Mehta',
      phone: '+919876543212',
      status: 'no-show',
      reason: 'Sports injury',
      created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      preferred_date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      preferred_time: '16:00',
      doctor: 'Dr. Sharma',
      is_returning: false,
      show_flags: ['no-show']
    }
  ]

  const tableData = data.length > 0 ? data : sampleData

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'no-show':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  const getSmartLabels = (patient: Patient) => {
    const labels = []
    
    if (patient.is_returning) labels.push('Returning')
    if (!patient.is_returning) labels.push('New')
    if (patient.follow_up_date) labels.push('Follow-up')
    if (patient.show_flags?.includes('chronic')) labels.push('Chronic')
    if (patient.show_flags?.includes('no-show')) labels.push('No-show Risk')
    
    return labels
  }

  const updateStatus = async (patientId: string, newStatus: string) => {
    setIsUpdating(patientId)
    
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', patientId)

      if (error) throw error

      toast({
        title: "Status Updated",
        description: `Patient status updated to ${newStatus}`,
      })

      if (onStatusUpdate) onStatusUpdate()
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update patient status",
        variant: "destructive"
      })
    } finally {
      setIsUpdating(null)
    }
  }

  const filteredData = tableData
    .filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.phone.includes(searchTerm) ||
                          (patient.email && patient.email.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesStatus = statusFilter === 'all' || patient.status === statusFilter
      
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === 'created_at') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
      return a.name.localeCompare(b.name)
    })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {view === 'appointments' ? 'Appointments Management' : 'Patient History'}
          </CardTitle>
          <CardDescription>
            Manage and track patient appointments with real-time updates
          </CardDescription>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="no-show">No Show</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created_at">Date Created</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="preferred_date">Appointment Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <AnimatePresence>
              {filteredData.map((patient, index) => (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Patient Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{patient.name}</h3>
                        <Badge className={getStatusColor(patient.status)}>
                          {patient.status}
                        </Badge>
                        {isUpdating === patient.id && (
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {patient.phone}
                        </div>
                        {patient.email && (
                          <div>{patient.email}</div>
                        )}
                        {patient.preferred_date && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(patient.preferred_date).toLocaleDateString()}
                          </div>
                        )}
                        {patient.preferred_time && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {patient.preferred_time}
                          </div>
                        )}
                        {patient.doctor && (
                          <div>Doctor: {patient.doctor}</div>
                        )}
                        {patient.reason && (
                          <div className="md:col-span-2">Reason: {patient.reason}</div>
                        )}
                      </div>

                      {/* Smart Labels */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {getSmartLabels(patient).map((label, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {label}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <WhatsAppCTA phone={patient.phone} name={patient.name} />
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Status
                            <ChevronDown className="h-4 w-4 ml-1" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => updateStatus(patient.id, 'pending')}>
                            Pending
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(patient.id, 'completed')}>
                            Completed
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(patient.id, 'cancelled')}>
                            Cancelled
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(patient.id, 'no-show')}>
                            No Show
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Calendar className="h-4 w-4 mr-2" />
                            Reschedule
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Add Notes
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredData.length === 0 && (
              <div className="text-center py-8">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No patients found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your filters' 
                    : 'No patient data available'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
