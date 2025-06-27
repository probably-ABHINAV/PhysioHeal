
"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User, Calendar } from "lucide-react"

interface TimelineEvent {
  id: string
  time: string
  patient_name: string
  type: 'appointment' | 'follow-up' | 'consultation' | 'therapy'
  status: 'completed' | 'in-progress' | 'upcoming' | 'cancelled'
  duration: number
  doctor?: string
}

interface TimelineChartProps {
  data: TimelineEvent[]
}

export function TimelineChart({ data = [] }: TimelineChartProps) {
  const timelineData = data

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'appointment':
        return 'bg-blue-500'
      case 'therapy':
        return 'bg-green-500'
      case 'consultation':
        return 'bg-purple-500'
      case 'follow-up':
        return 'bg-orange-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const isCurrentTime = (eventTime: string) => {
    const current = getCurrentTime()
    return eventTime === current
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
            <Calendar className="h-5 w-5 text-blue-600" />
            Today's Timeline
          </CardTitle>
          <CardDescription>
            Real-time view of today's appointments and activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
            
            {/* Current Time Indicator */}
            <div className="mb-4 text-sm text-muted-foreground">
              Current time: <span className="font-medium">{getCurrentTime()}</span>
            </div>

            <div className="space-y-6">
              {timelineData.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-start gap-4"
                >
                  {/* Timeline Dot */}
                  <div className={`relative z-10 w-4 h-4 rounded-full ${getTypeColor(event.type)} 
                    ${event.status === 'in-progress' ? 'animate-pulse ring-4 ring-blue-200' : ''}`} 
                  />

                  {/* Event Card */}
                  <div className={`flex-1 p-4 rounded-lg border transition-all hover:shadow-md
                    ${event.status === 'in-progress' ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-blue-600">{event.time}</span>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {event.type}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {event.duration} min
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{event.patient_name}</span>
                      </div>
                      {event.doctor && (
                        <div className="text-muted-foreground">
                          with {event.doctor}
                        </div>
                      )}
                    </div>

                    {event.status === 'in-progress' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 p-2 bg-blue-100 rounded text-sm text-blue-800 font-medium"
                      >
                        🔴 Currently in session
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {timelineData.length === 0 && (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No appointments scheduled</h3>
                <p className="text-muted-foreground">
                  Appointments will appear here once patients start booking
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
