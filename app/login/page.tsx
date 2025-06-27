import { Suspense } from "react"
import LoginForm from "@/components/login-form"

// Force dynamic rendering to prevent prerendering errors
export const dynamic = 'force-dynamic'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4">
      <Suspense fallback={
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p>Loading login form...</p>
            </div>
          </div>
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  )
}
```

Now, create a dummy `LoginForm` component to satisfy the import and ensure the code runs without errors.

```typescript
"use client";

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

const LoginForm = () => {
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

        // Redirect to requested page or home
        router.push(redirectTo)
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardContent className="p-8">
              <div className="text-center">Loading...</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4">
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
    </div>
  )
}

export default LoginForm;
```

```typescript
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

const LoginForm = () => {
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

        // Redirect to requested page or home
        router.push(redirectTo)
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardContent className="p-8">
              <div className="text-center">Loading...</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4">
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
    </div>
  )
}


export default LoginForm;
```

```typescript
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { createUser } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export function SettingsForm({ className, ...props }: Props) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await createUser(formData.email, formData.password);

    if (result?.error) {
      toast({
        title: "Something went wrong.",
        description: "Failed to create user, please try again.",
        variant: "destructive",
      });
    }

    if (result?.data) {
      toast({
        description: "User created successfully",
      });
    }

    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className={cn("grid gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Make changes to your profile here. Click save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
        </CardContent>
      </Card>
      <Button type="submit">Save changes</Button>
    </form>
  );
}
```

```typescript
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

const LoginForm = () => {
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

        // Redirect to requested page or home
        router.push(redirectTo)
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardContent className="p-8">
              <div className="text-center">Loading...</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4">
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
    </div>
  )
}


export default LoginForm
```

```typescript
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginCard({ className, ...props }: Props) {
  const { toast } = useToast();
  const [isPending, startTransition] = useState(false);
  const router = useRouter();

  async function handleGithubLogin() {
    startTransition(async () => {
      try {
        await signIn("github");
      } catch (error: any) {
        toast({
          title: "Something went wrong.",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        startTransition(() => {
          router.refresh();
        });
      }
    });
  }

  async function handleCredentialsLogin(data: FormData) {
    startTransition(async () => {
      try {
        await signIn("credentials", {
          ...Object.fromEntries(data),
          redirectTo: "/dashboard",
        });
      } catch (error: any) {
        toast({
          title: "Something went wrong.",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        startTransition(() => {
          router.refresh();
        });
      }
    });
  }

  return (
    <Card className={cn("w-[350px]", className)}>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email below to login.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="m@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
        <Button isLoading={isPending} disabled={isPending} className="w-full">
          {isPending ? "Loading..." : "Login"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleGithubLogin}
          isLoading={isPending}
          disabled={isPending}
          className="w-full"
        >
          Github
        </Button>
      </CardContent>
    </Card>
  );
}
```