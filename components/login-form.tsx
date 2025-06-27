
"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { signInWithEmail, signUpWithEmail } from "@/lib/supabase"

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [isClient, setIsClient] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/'
  const { toast } = useToast()

  // Ensure this only runs on client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Check for authorized admin email
      if (formData.email === 'xoxogroovy@gmail.com' && formData.password === 'Cypher123@') {
        // Store admin session in localStorage (browser only)
        if (typeof window !== 'undefined') {
          localStorage.setItem('isLoggedIn', 'true')
          localStorage.setItem('userEmail', formData.email)
          localStorage.setItem('userRole', 'admin')
        }

        toast({
          title: "Login Successful",
          description: "Welcome back, Admin!",
        })

        // Redirect to requested page or admin dashboard
        router.push(redirectTo === '/' ? '/admin' : redirectTo)
        return
      }

      // Try Supabase authentication
      let result
      if (isLogin) {
        result = await signInWithEmail(formData.email, formData.password)
      } else {
        result = await signUpWithEmail(formData.email, formData.password, {
          role: 'patient'
        })
      }

      if (result.error) {
        toast({
          title: "Authentication Error",
          description: result.error.message,
          variant: "destructive",
        })
        return
      }

      if (result.data.user) {
        toast({
          title: isLogin ? "Login Successful" : "Account Created",
          description: isLogin ? "Welcome back!" : "Please check your email to verify your account.",
        })

        if (isLogin) {
          router.push(redirectTo)
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getPageTitle = () => {
    switch (redirectTo) {
      case '/admin':
        return 'Admin Login'
      case '/setup-database':
        return 'Database Setup Login'
      case '/diagnostics':
        return 'Diagnostics Login'
      default:
        return 'Login'
    }
  }

  const getPageDescription = () => {
    switch (redirectTo) {
      case '/admin':
        return 'Access the admin dashboard to manage appointments and messages'
      case '/setup-database':
        return 'Configure and initialize the Supabase database'
      case '/diagnostics':
        return 'Run system diagnostics and monitor application health'
      default:
        return 'Sign in to your account'
    }
  }

  // Show loading while client initializes to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="w-full max-w-md">
        <Card>
          <CardContent className="p-8">
            <div className="text-center">Loading...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/95">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">PhysioHeal</span>
          </div>
          <CardTitle className="text-2xl font-bold">{getPageTitle()}</CardTitle>
          <CardDescription>{getPageDescription()}</CardDescription>
        </CardHeader>
        <CardContent>
          {redirectTo !== '/' && (
            <Alert className="mb-6 border-blue-200 bg-blue-50">
              <Shield className="h-4 w-4" />
              <AlertDescription>
                This page requires admin authentication.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{isLogin ? 'Signing in...' : 'Creating account...'}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </Button>
          </div>

          <div className="mt-4 text-center">
            <Button
              variant="outline"
              onClick={() => router.push('/')}
              className="text-sm"
            >
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
