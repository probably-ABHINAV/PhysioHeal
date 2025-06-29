
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Video, Phone, User, Settings } from "lucide-react"

interface Consultation {
  id: number
  date: string
  time: string
  therapist: string
  type: "video" | "phone"
  status: "scheduled" | "active" | "completed"
  meetingUrl?: string
}

const mockConsultations: Consultation[] = [
  {
    id: 1,
    date: "2024-01-30",
    time: "10:00 AM",
    therapist: "Dr. Sarah Johnson",
    type: "video",
    status: "scheduled",
    meetingUrl: "https://zoom.us/j/123456789"
  },
  {
    id: 2,
    date: "2024-01-25",
    time: "2:00 PM",
    therapist: "Dr. Michael Chen",
    type: "video",
    status: "completed"
  }
]

export function VideoConsultation() {
  const [consultations] = useState<Consultation[]>(mockConsultations)

  const joinMeeting = (meetingUrl: string) => {
    window.open(meetingUrl, '_blank')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-blue-100 text-blue-800"
      case "active": return "bg-green-100 text-green-800"
      case "completed": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Video className="mr-2 h-5 w-5" />
            Video Consultations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {consultations.map((consultation) => (
              <div
                key={consultation.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {consultation.type === "video" ? (
                      <Video className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Phone className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  
                  <div>
                    <div className="font-semibold">Video Consultation</div>
                    <div className="text-sm text-muted-foreground flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{consultation.date}</span>
                      <Clock className="h-4 w-4" />
                      <span>{consultation.time}</span>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>with {consultation.therapist}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(consultation.status)}>
                    {consultation.status}
                  </Badge>
                  
                  {consultation.status === "scheduled" && consultation.meetingUrl && (
                    <Button
                      onClick={() => joinMeeting(consultation.meetingUrl!)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Video className="mr-2 h-4 w-4" />
                      Join Meeting
                    </Button>
                  )}
                  
                  {consultation.status === "completed" && (
                    <Button variant="outline" size="sm">
                      View Notes
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Before Your Video Call</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Test your camera and microphone</li>
              <li>• Ensure stable internet connection</li>
              <li>• Find a quiet, well-lit space</li>
              <li>• Have your exercise equipment ready</li>
            </ul>
          </div>
          
          <Button className="w-full mt-4">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule New Consultation
          </Button>
        </CardContent>
      </Card>

      {/* Tech Check Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            Technical Setup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="flex items-center">
                <Video className="mr-2 h-4 w-4" />
                Camera Test
              </span>
              <Button variant="outline" size="sm">Test</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                Microphone Test
              </span>
              <Button variant="outline" size="sm">Test</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Connection Speed
              </span>
              <Badge variant="outline">Good</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
