import { Metadata } from "next"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  TrendingUp, 
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  Download,
  Settings
} from "lucide-react"

export const metadata: Metadata = {
  title: "Admin Dashboard | PhysioHeal Clinic",
  description: "Manage patients, appointments, and clinic operations",
}

// Mock data - replace with real Supabase queries
const dashboardData = {
  stats: {
    totalPatients: 342,
    activePatients: 156,
    todayAppointments: 12,
    pendingReviews: 5,
    monthlyRevenue: 25400,
    averageRating: 4.8
  },
  recentAppointments: [
    {
      id: 1,
      patient: "John Smith",
      service: "Sports Physiotherapy",
      time: "10:00 AM",
      status: "confirmed",
      therapist: "Dr. Sarah Johnson"
    },
    {
      id: 2,
      patient: "Mary Johnson",
      service: "Manual Therapy", 
      time: "11:30 AM",
      status: "in-progress",
      therapist: "Dr. Michael Chen"
    }
  ],
  pendingReviews: [
    {
      id: 1,
      patient: "Alice Brown",
      rating: 5,
      comment: "Excellent service, very professional staff...",
      date: "2024-01-29",
      flagged: false
    },
    {
      id: 2,
      patient: "Bob Wilson",
      rating: 2,
      comment: "Not satisfied with the treatment...",
      date: "2024-01-28",
      flagged: true
    }
  ],
  alerts: [
    {
      id: 1,
      type: "warning",
      message: "Low inventory: Exercise bands",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "info",
      message: "New patient registration",
      time: "4 hours ago"
    }
  ]
}

export default async function AdminDashboardPage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", session.user.id)
    .single()

  if (!profile || profile.role !== "admin") {
    redirect("/")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-blue-100 text-blue-800"
      case "in-progress": return "bg-green-100 text-green-800"
      case "completed": return "bg-gray-100 text-gray-800"
      case "cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your clinic operations</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                  <p className="text-2xl font-bold">{dashboardData.stats.totalPatients}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Appointments</p>
                  <p className="text-2xl font-bold">{dashboardData.stats.todayAppointments}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Reviews</p>
                  <p className="text-2xl font-bold">{dashboardData.stats.pendingReviews}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                  <p className="text-2xl font-bold">${dashboardData.stats.monthlyRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full lg:w-fit grid-cols-4">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Today's Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Today's Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.recentAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-semibold">{appointment.patient}</div>
                          <div className="text-sm text-muted-foreground">{appointment.service}</div>
                          <div className="text-sm text-muted-foreground">
                            {appointment.time} - {appointment.therapist}
                          </div>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Add New Appointment
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Register New Patient
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Export Reports
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    System Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Pending Reviews
                  </span>
                  <Badge variant="outline">{dashboardData.pendingReviews.length} pending</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.pendingReviews.map((review) => (
                    <div key={review.id} className={`p-4 border rounded-lg ${
                      review.flagged ? 'border-red-200 bg-red-50' : 'border-gray-200'
                    }`}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-semibold">{review.patient}</div>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                        </div>
                        {review.flagged && (
                          <Badge variant="destructive">
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            Flagged
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{review.comment}</p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive">
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Patient Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Patient Management</h3>
                  <p className="text-muted-foreground mb-4">
                    View and manage all patient records, treatment history, and progress tracking.
                  </p>
                  <Button>View All Patients</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Analytics & Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Analytics Dashboard</h3>
                  <p className="text-muted-foreground mb-4">
                    Track clinic performance, patient outcomes, and revenue insights.
                  </p>
                  <Button>View Analytics</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Alerts */}
        {dashboardData.alerts.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dashboardData.alerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {alert.type === "warning" ? (
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-blue-600" />
                      )}
                      <span>{alert.message}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{alert.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}