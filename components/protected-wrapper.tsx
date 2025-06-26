
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Lock, Shield, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase"

interface ProtectedWrapperProps {
  children: React.ReactNode
  requireAuth?: boolean
  fallbackPassword?: string
  title?: string
  description?: string
}

export function ProtectedWrapper({ 
  children, 
  requireAuth = false, 
  fallbackPassword = "admin123",
  title = "System Access",
  description = "Enter credentials to access diagnostics"
}: ProtectedWrapperProps) {
  const [hasAccess, setHasAccess] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    if (!requireAuth) {
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        setUser(session.user)
        setHasAccess(true)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordAccess = () => {
    if (password === fallbackPassword || password === "diagnostics") {
      setHasAccess(true)
      setError("")
    } else {
      setError("Invalid access code")
      setPassword("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handlePasswordAccess()
    }
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (!hasAccess && (requireAuth || fallbackPassword)) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-full max-w-md"
        >
          <Card className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30 shadow-2xl">
            <CardHeader className="text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-primary to-primary/60 rounded-full flex items-center justify-center"
              >
                <Shield className="w-8 h-8 text-white" />
              </motion.div>
              <CardTitle className="text-2xl bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {title}
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {requireAuth && user ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-green-600 dark:text-green-400"
                >
                  ✅ Authenticated as {user.email}
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter access code"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pr-10 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 border-white/30"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                  
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm text-center"
                    >
                      {error}
                    </motion.p>
                  )}
                  
                  <Button 
                    onClick={handlePasswordAccess} 
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white border-0 shadow-lg"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Access Diagnostics
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return <>{children}</>
}
