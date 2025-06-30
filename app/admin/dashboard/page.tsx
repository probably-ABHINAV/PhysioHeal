"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { motion } from "framer-motion"
import { Shield, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AdminDashboard } from "@/components/admin-dashboard"
import { useRouter } from "next/navigation"

export default function AdminDashboardPage() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      // Check for hardcoded login first (only on client side)
      if (typeof window !== 'undefined') {
        const isLoggedIn = localStorage.getItem('isLoggedIn')
        const userEmail = localStorage.getItem('userEmail')
        const userRole = localStorage.getItem('userRole')

      if (isLoggedIn === 'true' && userEmail === 'xoxogroovy@gmail.com') {
          setIsAuthorized(true)
          setUser({
            email: userEmail,
            user_metadata: { role: 'admin' }
          })
          return
        }
      }

      const { data: { session }, error } = await supabase.auth.getSession()

      if (error || !session) {
        setIsAuthorized(false)
        return
      }

      const sessionUserRole = session.user.user_metadata?.role
      const sessionUserEmail = session.user.email

      // Allow access for admin/doctor roles or demo admin email
      const isAdmin = sessionUserRole === 'admin' || 
                     sessionUserRole === 'doctor' || 
                     sessionUserEmail === 'admin@demo.com'

      if (isAdmin) {
        setIsAuthorized(true)
        setUser(session.user)
      } else {
        setIsAuthorized(false)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setIsAuthorized(false)
    }
  }

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span>Checking authorization...</span>
        </div>
      </div>
    )
  }

  if (isAuthorized === false) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <Card className="border-red-200 bg-red-50">
            <CardHeader className="text-center">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <CardTitle className="text-red-800">Access Denied</CardTitle>
              <CardDescription className="text-red-600">
                You need admin or doctor privileges to access the dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-red-600">
                {user ? (
                  <>Current role: <strong>{user.user_metadata?.role || 'none'}</strong></>
                ) : (
                  'Please sign in with an authorized account.'
                )}
              </p>
              <div className="space-y-2">
                <Button 
                  onClick={() => router.push('/login')}
                  className="w-full"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => router.push('/')}
                  variant="outline"
                  className="w-full"
                >
                  Go Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  const handleLogout = async () => {
    // Clear localStorage for hardcoded login (only on client side)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('userEmail')
      localStorage.removeItem('userRole')
    }

    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Security Notice */}
          <Card className="mb-6 border-blue-200 bg-blue-50/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-blue-800">Admin Dashboard</h3>
                  <p className="text-sm text-blue-600">
                    Welcome, {user?.email} • Role: {user?.user_metadata?.role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Dashboard Component */}
          <AdminDashboard user={user} />

          {/* Logout Button */}
          <div className="mt-6 flex justify-end">
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}