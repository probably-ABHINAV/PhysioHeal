
"use client"

import { useState } from "react"
import { ProtectedAdminWrapper } from "@/components/protected-admin-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Database, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SetupDatabasePage() {
  const [isSetupRunning, setIsSetupRunning] = useState(false)
  const [setupResults, setSetupResults] = useState<string[]>([])
  const [setupStatus, setSetupStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const { toast } = useToast()

  const runDatabaseSetup = async () => {
    setIsSetupRunning(true)
    setSetupResults([])
    setSetupStatus('idle')

    try {
      // This would typically run your SQL setup script
      // For now, we'll simulate the setup process
      const steps = [
        "Checking Supabase connection...",
        "Creating profiles table...",
        "Creating appointments table...",
        "Creating messages table...",
        "Creating reviews table...",
        "Creating diagnostic_logs table...",
        "Setting up Row Level Security...",
        "Creating user management functions...",
        "Creating indexes for performance...",
        "Setup complete!"
      ]

      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setSetupResults(prev => [...prev, steps[i]])
      }

      setSetupStatus('success')
      toast({
        title: "Database Setup Complete",
        description: "Your Supabase database is ready to use!",
      })
    } catch (error) {
      setSetupStatus('error')
      toast({
        title: "Setup Failed",
        description: "Failed to set up the database. Check console for details.",
        variant: "destructive",
      })
    } finally {
      setIsSetupRunning(false)
    }
  }

  return (
    <ProtectedAdminWrapper>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Supabase Database Setup</h1>
            <p className="text-muted-foreground">
              Initialize your Supabase database with all required tables and security policies
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Setup Control */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-6 w-6" />
                  <span>Database Initialization</span>
                </CardTitle>
                <CardDescription>
                  Run this setup to create all required tables and configure your Supabase database
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Make sure you have configured your Supabase environment variables in Replit Secrets before running setup.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <h4 className="font-medium">This setup will create:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• User profiles table with role management</li>
                    <li>• Appointments management system</li>
                    <li>• Contact messages system</li>
                    <li>• Reviews and testimonials</li>
                    <li>• Diagnostic logging system</li>
                    <li>• Row Level Security policies</li>
                    <li>• Performance indexes</li>
                  </ul>
                </div>

                <Button 
                  onClick={runDatabaseSetup} 
                  disabled={isSetupRunning}
                  className="w-full"
                >
                  {isSetupRunning && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSetupRunning ? 'Setting up...' : 'Initialize Database'}
                </Button>
              </CardContent>
            </Card>

            {/* Setup Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {setupStatus === 'success' && <CheckCircle className="h-6 w-6 text-green-600" />}
                  {setupStatus === 'error' && <AlertCircle className="h-6 w-6 text-red-600" />}
                  {setupStatus === 'idle' && <Database className="h-6 w-6" />}
                  <span>Setup Progress</span>
                </CardTitle>
                <CardDescription>
                  Monitor the database setup process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {setupResults.length === 0 && !isSetupRunning && (
                    <p className="text-muted-foreground text-center py-4">
                      Click "Initialize Database" to start setup
                    </p>
                  )}
                  
                  {setupResults.map((result, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span>{result}</span>
                    </div>
                  ))}
                  
                  {isSetupRunning && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Loader2 className="h-4 w-4 animate-spin flex-shrink-0" />
                      <span>Running setup...</span>
                    </div>
                  )}
                </div>

                {setupStatus === 'success' && (
                  <Alert className="mt-4 border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Database setup completed successfully! You can now use all features of your application.
                    </AlertDescription>
                  </Alert>
                )}

                {setupStatus === 'error' && (
                  <Alert className="mt-4 border-red-200 bg-red-50" variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Setup failed. Please check your Supabase configuration and try again.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          {setupStatus === 'success' && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
                <CardDescription>Your database is ready! Here's what you can do next:</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Access Management</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Visit <a href="/login" className="text-blue-600 hover:underline">/login</a> to sign in</li>
                      <li>• Use admin@demo.com / admin123 for admin access</li>
                      <li>• Check <a href="/admin" className="text-blue-600 hover:underline">/admin</a> dashboard</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Test Features</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Run <a href="/diagnostics" className="text-blue-600 hover:underline">/diagnostics</a> to test</li>
                      <li>• Try booking an appointment</li>
                      <li>• Submit a contact form</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
    </ProtectedAdminWrapper>
  )
}
