
"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface ProtectedAdminWrapperProps {
  children: React.ReactNode
  requiredEmail?: string
}

export function ProtectedAdminWrapper({ 
  children, 
  requiredEmail = 'xoxogroovy@gmail.com' 
}: ProtectedAdminWrapperProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [user, setUser] = useState<any>(null)
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    checkAuthorization()
  }, [])

  const checkAuthorization = async () => {
    try {
      // First check localStorage for hardcoded login
      if (typeof window !== 'undefined') {
        const isLoggedIn = localStorage.getItem('isLoggedIn')
        const userEmail = localStorage.getItem('userEmail')
        const userRole = localStorage.getItem('userRole')

        if (isLoggedIn === 'true' && userEmail === requiredEmail) {
          setIsAuthorized(true)
          setUser({
            email: userEmail,
            user_metadata: { role: userRole || 'admin' }
          })
          return
        }
      }

      // Then check Supabase session
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error || !session) {
        setIsAuthorized(false)
        return
      }

      const userEmail = session.user.email
      const isAdmin = userEmail === requiredEmail

      setUser(session.user)
      setIsAuthorized(isAdmin)
    } catch (error) {
      console.error('Authorization check failed:', error)
      setIsAuthorized(false)
    }
  }

  if (isAuthorized === null) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <span className="text-lg">Checking authorization...</span>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="border-red-200 bg-red-50 max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-red-800 mb-2">Access Denied</h3>
            <p className="text-red-600 mb-4">
              You are not authorized to access this page.
            </p>
            <p className="text-sm text-red-500 mb-4">
              Only {requiredEmail} can access this area.
            </p>
            <div className="space-y-2">
              <Button 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    const currentPath = window.location.pathname
                    router.push(`/login?redirect=${encodeURIComponent(currentPath)}`)
                  } else {
                    router.push('/login')
                  }
                }} 
                className="w-full"
              >
                Go to Login
              </Button>
              <Button 
                onClick={() => router.push('/')} 
                variant="outline"
                className="w-full"
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
