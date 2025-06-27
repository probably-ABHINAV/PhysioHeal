
"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { LogIn, Mail, Lock, User } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Check for hardcoded credentials first
      if (!isSignUp && email === "xoxogroovy@gmail.com" && password === "Cypher123@") {
        // Simulate successful login for hardcoded credentials
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard!",
        })
        // Store login state in localStorage for demo purposes
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('userEmail', email)
        localStorage.setItem('userRole', 'admin')
        router.push("/admin/dashboard")
        return
      }

      if (isSignUp) {
        // Sign up new user with admin role
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              role: 'admin' // Assign admin role by default
            }
          }
        })

        if (error) throw error

        toast({
          title: "Account Created",
          description: "Please check your email for verification link",
        })
      } else {
        // Sign in existing user
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        // Update user metadata to include admin role if not present
        if (data.user && !data.user.user_metadata?.role) {
          await supabase.auth.updateUser({
            data: { role: 'admin' }
          })
        }

        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard!",
        })
        router.push("/admin/dashboard")
      }
    } catch (error: any) {
      toast({
        title: isSignUp ? "Sign Up Failed" : "Login Failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Quick admin access for development
  const quickAdminAccess = async () => {
    setIsLoading(true)
    try {
      // Try to sign in as admin@demo.com with password "admin123"
      const { data, error } = await supabase.auth.signInWithPassword({
        email: "admin@demo.com",
        password: "admin123",
      })

      if (error) {
        // If user doesn't exist, create it
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: "admin@demo.com",
          password: "admin123",
          options: {
            data: { role: 'admin' }
          }
        })
        
        if (signUpError) throw signUpError
        
        toast({
          title: "Demo Admin Created",
          description: "Demo admin account created. Please check email for verification.",
        })
      } else {
        // Update role if needed
        if (!data.user.user_metadata?.role) {
          await supabase.auth.updateUser({
            data: { role: 'admin' }
          })
        }
        
        toast({
          title: "Demo Access Granted",
          description: "Logged in as demo admin",
        })
        router.push("/admin/dashboard")
      }
    } catch (error: any) {
      toast({
        title: "Demo Access Failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-sm bg-white/80 border border-blue-200 shadow-xl">
          <CardHeader className="text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center"
            >
              <LogIn className="w-8 h-8 text-white" />
            </motion.div>
            <CardTitle className="text-2xl text-blue-800">
              {isSignUp ? "Create Admin Account" : "Admin Access"}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : (isSignUp ? "Create Account" : "Sign In")}
              </Button>
            </form>

            <div className="text-center">
              <Button
                variant="link"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600"
              >
                {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Development Mode</span>
              </div>
            </div>

            <Button
              onClick={quickAdminAccess}
              variant="outline"
              className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
              disabled={isLoading}
            >
              <User className="w-4 h-4 mr-2" />
              Quick Demo Admin Access
            </Button>

            <div className="text-xs text-center text-gray-500">
              Demo credentials: admin@demo.com / admin123
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
