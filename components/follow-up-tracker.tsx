
"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, Phone, MessageCircle, Calendar, AlertTriangle, CheckCircle2, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { WhatsAppCTA } from "./whatsapp-cta"
import { useToast } from "@/hooks/use-toast"

interface FollowUp {
  id: string
  patient_name: string
  phone: string
  follow_up_date: string
  last_appointment: string
  reason: string
  urgency: 'high' | 'medium' | 'low'
  status: 'pending' | 'contacted' | 'scheduled' | 'completed'
  notes?: string
}

interface FollowUpTrackerProps {
  data: FollowUp[]
  onUpdate?: () => void
}

export function FollowUpTracker({ data = [], onUpdate }: FollowUpTrackerProps) {
  const [filter, setFilter] = useState<'all' | 'overdue' | 'today' | 'upcoming'>('all')
  const { toast } = useToast()

  // Sample data if none provided
  const sampleData: FollowUp[] = [
    {
      id: '1',
      patient_name: 'Riya Sharma',
      phone: '+919876543210',
      follow_up_date: new Date(Date.now() - 86400000).toISOString(), // Yesterday (overdue)
      last_appointment: new Date(Date.now() - 7 * 86400000).toISOString(),
      reason: 'Post-surgery rehabilitation check',
      urgency: 'high',
      status: 'pending',
      notes: 'Patient reported some discomfort in last session'
    },
    {
      id: '2',
      patient_name: 'Amit Kumar',
      phone: '+919876543211',
      follow_up_date: new Date().toISOString(), // Today
      last_appointment: new Date(Date.now() - 14 * 86400000).toISOString(),
      reason: 'Chronic back pain management',
      urgency: 'medium',
      status: 'contacted',
      notes: 'Regular monthly check-in'
    },
    {
      id: '3',
      patient_name: 'Priya Mehta',
      phone: '+919876543212',
      follow_up_date: new Date(Date.now() + 3 * 86400000).toISOString(), // In 3 days
      last_appointment: new Date(Date.now() - 10 * 86400000).toISOString(),
      reason: 'Sports injury recovery assessment',
      urgency: 'low',
      status: 'scheduled'
    }
  ]

  const followUpData = data.length > 0 ? data : sampleData

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800'
      case 'pending':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDaysFromNow = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return { text: `${Math.abs(diffDays)} days overdue`, type: 'overdue' }
    if (diffDays === 0) return { text: 'Today', type: 'today' }
    if (diffDays === 1) return { text: 'Tomorrow', type: 'tomorrow' }
    return { text: `In ${diffDays} days`, type: 'upcoming' }
  }

  const filteredData = followUpData.filter(item => {
    const dayInfo = getDaysFromNow(item.follow_up_date)
    
    switch (filter) {
      case 'overdue':
        return dayInfo.type === 'overdue'
      case 'today':
        return dayInfo.type === 'today'
      case 'upcoming':
        return dayInfo.type === 'upcoming' || dayInfo.type === 'tomorrow'
      default:
        return true
    }
  }).sort((a, b) => {
    // Sort by urgency and date
    const urgencyOrder = { high: 3, medium: 2, low: 1 }
    if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
      return urgencyOrder[b.urgency] - urgencyOrder[a.urgency]
    }
    return new Date(a.follow_up_date).getTime() - new Date(b.follow_up_date).getTime()
  })

  const updateStatus = (id: string, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Follow-up status updated to ${newStatus}`,
    })
    if (onUpdate) onUpdate()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-600" />
            Follow-up Tracker
          </CardTitle>
          <CardDescription>
            Manage patient follow-ups and ensure timely care continuity
          </CardDescription>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            {(['all', 'overdue', 'today', 'upcoming'] as const).map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(filterType)}
                className="capitalize"
              >
                {filterType === 'all' ? 'All' : filterType}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <AnimatePresence>
              {filteredData.map((followUp, index) => {
                const dayInfo = getDaysFromNow(followUp.follow_up_date)
                
                return (
                  <motion.div
                    key={followUp.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 border rounded-lg ${
                      dayInfo.type === 'overdue' ? 'border-red-200 bg-red-50' :
                      dayInfo.type === 'today' ? 'border-yellow-200 bg-yellow-50' :
                      'border-gray-200 bg-white'
                    } hover:shadow-md transition-all`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      {/* Patient Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{followUp.patient_name}</h3>
                          <Badge className={getUrgencyColor(followUp.urgency)}>
                            {followUp.urgency} urgency
                          </Badge>
                          <Badge className={getStatusColor(followUp.status)}>
                            {followUp.status}
                          </Badge>
                          {dayInfo.type === 'overdue' && (
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {followUp.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Follow-up: {dayInfo.text}
                          </div>
                          <div>
                            Last seen: {new Date(followUp.last_appointment).toLocaleDateString()}
                          </div>
                          <div className="md:col-span-2">
                            Reason: {followUp.reason}
                          </div>
                        </div>

                        {followUp.notes && (
                          <div className="text-sm bg-gray-100 p-2 rounded border-l-4 border-blue-400">
                            <strong>Notes:</strong> {followUp.notes}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        <WhatsAppCTA 
                          phone={followUp.phone} 
                          name={followUp.patient_name}
                          message={`Hi ${followUp.patient_name}, this is a gentle reminder about your follow-up appointment. Please let us know if you'd like to schedule your next session.`}
                        />
                        
                        <div className="flex gap-2">
                          {followUp.status === 'pending' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStatus(followUp.id, 'contacted')}
                            >
                              Mark Contacted
                            </Button>
                          )}
                          
                          {followUp.status === 'contacted' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStatus(followUp.id, 'scheduled')}
                            >
                              Mark Scheduled
                            </Button>
                          )}
                          
                          {followUp.status === 'scheduled' && (
                            <Button
                              size="sm"
                              onClick={() => updateStatus(followUp.id, 'completed')}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {filteredData.length === 0 && (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No follow-ups found</h3>
                <p className="text-muted-foreground">
                  {filter === 'all' 
                    ? 'No follow-ups scheduled' 
                    : `No ${filter} follow-ups`}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
