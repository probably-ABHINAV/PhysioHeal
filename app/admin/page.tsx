
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  Calendar, 
  MessageSquare, 
  Phone, 
  LogOut, 
  Search, 
  Filter,
  Eye,
  EyeOff,
  Clock,
  User,
  Mail,
  RefreshCw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase"
import type { Database } from "@/lib/supabase"

type Appointment = Database['public']['Tables']['appointments']['Row']
type Message = Database['public']['Tables']['messages']['Row']

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'seen' | 'read'>('all')
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    checkUser()
    fetchData()
  }, [])

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/login')
      return
    }
    setUser(session.user)
  }

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [appointmentsRes, messagesRes] = await Promise.all([
        supabase
          .from('appointments')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false })
      ])

      if (appointmentsRes.data) setAppointments(appointmentsRes.data)
      if (messagesRes.data) setMessages(messagesRes.data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const updateAppointmentStatus = async (id: string, status: 'pending' | 'seen') => {
    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      })
    } else {
      setAppointments(prev =>
        prev.map(apt => apt.id === id ? { ...apt, status } : apt)
      )
      toast({
        title: "Success",
        description: `Appointment marked as ${status}`,
      })
    }
  }

  const updateMessageStatus = async (id: string, status: 'pending' | 'read') => {
    const { error } = await supabase
      .from('messages')
      .update({ status })
      .eq('id', id)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      })
    } else {
      setMessages(prev =>
        prev.map(msg => msg.id === id ? { ...msg, status } : msg)
      )
      toast({
        title: "Success",
        description: `Message marked as ${status}`,
      })
    }
  }

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.phone.includes(searchTerm) ||
                         apt.reason.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || apt.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msg.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || msg.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const openWhatsApp = (phone: string, name: string) => {
    const message = encodeURIComponent(`Hi ${name}, this is PhysioHeal clinic. Thank you for booking an appointment with us.`)
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${message}`, '_blank')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.email}</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, phone, email, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('all')}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={filterStatus === 'pending' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('pending')}
              size="sm"
            >
              Pending
            </Button>
            <Button
              variant={filterStatus === 'seen' || filterStatus === 'read' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('seen')}
              size="sm"
            >
              Completed
            </Button>
            <Button onClick={fetchData} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="appointments" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="appointments" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Appointments ({appointments.filter(a => a.status === 'pending').length})
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Messages ({messages.filter(m => m.status === 'pending').length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="appointments" className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <Card key={appointment.id} className="glass-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-primary" />
                        <div>
                          <CardTitle className="text-lg">{appointment.name}</CardTitle>
                          <CardDescription>
                            <Clock className="w-4 h-4 inline mr-1" />
                            {formatDate(appointment.created_at)}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant={appointment.status === 'pending' ? 'default' : 'secondary'}>
                        {appointment.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Contact</p>
                        <p className="font-medium">{appointment.phone}</p>
                        {appointment.email && <p className="text-sm text-muted-foreground">{appointment.email}</p>}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Preferred Time</p>
                        <p className="font-medium">{formatDate(appointment.preferred_time)}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Reason</p>
                      <p className="mt-1">{appointment.reason}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button
                        onClick={() => window.open(`tel:${appointment.phone}`, '_self')}
                        variant="outline"
                        size="sm"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                      <Button
                        onClick={() => openWhatsApp(appointment.phone, appointment.name)}
                        variant="outline"
                        size="sm"
                        className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                      >
                        💬 WhatsApp
                      </Button>
                      <Button
                        onClick={() => updateAppointmentStatus(
                          appointment.id,
                          appointment.status === 'pending' ? 'seen' : 'pending'
                        )}
                        variant={appointment.status === 'pending' ? 'default' : 'outline'}
                        size="sm"
                      >
                        {appointment.status === 'pending' ? (
                          <>
                            <Eye className="w-4 h-4 mr-2" />
                            Mark as Seen
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-4 h-4 mr-2" />
                            Mark as Pending
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredAppointments.length === 0 && (
                <Card className="glass-card">
                  <CardContent className="text-center py-8">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No appointments found</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="messages" className="space-y-4">
              {filteredMessages.map((message) => (
                <Card key={message.id} className="glass-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary" />
                        <div>
                          <CardTitle className="text-lg">{message.name}</CardTitle>
                          <CardDescription>
                            <Clock className="w-4 h-4 inline mr-1" />
                            {formatDate(message.created_at)}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant={message.status === 'pending' ? 'default' : 'secondary'}>
                        {message.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                        <p className="font-medium">{message.email}</p>
                      </div>
                      {message.phone && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Phone</p>
                          <p className="font-medium">{message.phone}</p>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Message</p>
                      <p className="mt-1">{message.message}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button
                        onClick={() => window.open(`mailto:${message.email}`, '_self')}
                        variant="outline"
                        size="sm"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                      {message.phone && (
                        <>
                          <Button
                            onClick={() => window.open(`tel:${message.phone}`, '_self')}
                            variant="outline"
                            size="sm"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                          </Button>
                          <Button
                            onClick={() => openWhatsApp(message.phone!, message.name)}
                            variant="outline"
                            size="sm"
                            className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                          >
                            💬 WhatsApp
                          </Button>
                        </>
                      )}
                      <Button
                        onClick={() => updateMessageStatus(
                          message.id,
                          message.status === 'pending' ? 'read' : 'pending'
                        )}
                        variant={message.status === 'pending' ? 'default' : 'outline'}
                        size="sm"
                      >
                        {message.status === 'pending' ? (
                          <>
                            <Eye className="w-4 h-4 mr-2" />
                            Mark as Read
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-4 h-4 mr-2" />
                            Mark as Unread
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredMessages.length === 0 && (
                <Card className="glass-card">
                  <CardContent className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No messages found</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
