
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, User, Clock, Download } from "lucide-react"

export const metadata: Metadata = {
  title: "Patient Dashboard | PhysioHeal Clinic",
  description: "Track your physiotherapy progress and manage appointments",
}

async function getPatientData(userId: string) {
  // This would fetch from your Supabase database
  return {
    profile: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      joinDate: "2024-01-15"
    },
    appointments: [
      {
        id: 1,
        date: "2024-01-30",
        time: "10:00 AM",
        service: "Sports Physiotherapy",
        status: "confirmed",
        therapist: "Dr. Sarah Johnson"
      },
      {
        id: 2,
        date: "2024-01-25",
        time: "2:00 PM",
        service: "Manual Therapy",
        status: "completed",
        therapist: "Dr. Michael Chen"
      }
    ],
    progress: {
      totalSessions: 8,
      completedSessions: 5,
      improvementScore: 85,
      nextGoal: "Full range of motion recovery"
    }
  }
}

export default async function PatientDashboard() {
  const supabase = createServerComponentClient({ cookies })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const patientData = await getPatientData(session.user.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {patientData.profile.name}!</h1>
          <p className="text-muted-foreground">Track your recovery progress and manage your appointments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Overview */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Progress Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{patientData.progress.totalSessions}</div>
                    <div className="text-sm text-muted-foreground">Total Sessions</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{patientData.progress.completedSessions}</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{patientData.progress.improvementScore}%</div>
                    <div className="text-sm text-muted-foreground">Improvement</div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-800">Next Goal</h4>
                  <p className="text-yellow-700">{patientData.progress.nextGoal}</p>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patientData.appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-semibold">{appointment.service}</div>
                        <div className="text-sm text-muted-foreground">
                          {appointment.date} at {appointment.time}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          with {appointment.therapist}
                        </div>
                      </div>
                      <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                        {appointment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book New Appointment
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="font-medium">{patientData.profile.email}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <div className="font-medium">{patientData.profile.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Member Since</div>
                  <div className="font-medium">{patientData.profile.joinDate}</div>
                </div>
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Download Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  Reschedule Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  View Exercise Plan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
