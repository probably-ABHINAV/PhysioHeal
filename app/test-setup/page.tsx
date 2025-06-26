
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { createClient } from "@/lib/supabase"

export default function TestSetupPage() {
  const [testResults, setTestResults] = useState<any[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const runTests = async () => {
    setIsRunning(true)
    const results: any[] = []

    // Test 1: Environment Variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    results.push({
      name: "Environment Variables",
      status: supabaseUrl && supabaseAnonKey ? "success" : "error",
      message: supabaseUrl && supabaseAnonKey ? "✓ Environment variables configured" : "✗ Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
    })

    // Test 2: Supabase Connection
    try {
      const supabase = createClient()
      const { data, error } = await supabase.from('appointments').select('count', { count: 'exact', head: true })
      
      results.push({
        name: "Database Connection",
        status: error ? "error" : "success",
        message: error ? `✗ Connection failed: ${error.message}` : "✓ Successfully connected to Supabase",
      })
    } catch (error: any) {
      results.push({
        name: "Database Connection",
        status: "error",
        message: `✗ Connection error: ${error.message}`,
      })
    }

    // Test 3: Tables Exist
    try {
      const supabase = createClient()
      const [appointmentsTest, messagesTest] = await Promise.all([
        supabase.from('appointments').select('count', { count: 'exact', head: true }),
        supabase.from('messages').select('count', { count: 'exact', head: true })
      ])
      
      const appointmentsExists = !appointmentsTest.error
      const messagesExists = !messagesTest.error
      
      results.push({
        name: "Required Tables",
        status: appointmentsExists && messagesExists ? "success" : "error",
        message: appointmentsExists && messagesExists 
          ? "✓ Both appointments and messages tables exist" 
          : `✗ Missing tables: ${!appointmentsExists ? 'appointments ' : ''}${!messagesExists ? 'messages' : ''}`,
      })
    } catch (error: any) {
      results.push({
        name: "Required Tables",
        status: "error",
        message: `✗ Error checking tables: ${error.message}`,
      })
    }

    // Test 4: Form Insert Test
    try {
      const supabase = createClient()
      const testAppointment = {
        name: "Test User",
        phone: "+91 9999999999",
        email: "test@example.com",
        reason: "Test appointment - can be deleted",
        preferred_time: new Date().toISOString(),
      }
      
      const { error } = await supabase.from('appointments').insert(testAppointment)
      
      results.push({
        name: "Form Submission Test",
        status: error ? "error" : "success",
        message: error ? `✗ Insert failed: ${error.message}` : "✓ Form submissions working (test record created)",
      })
    } catch (error: any) {
      results.push({
        name: "Form Submission Test",
        status: "error",
        message: `✗ Insert test failed: ${error.message}`,
      })
    }

    setTestResults(results)
    setIsRunning(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle className="w-5 h-5 text-green-500" />
      case "error": return <XCircle className="w-5 h-5 text-red-500" />
      default: return <AlertCircle className="w-5 h-5 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success": return <Badge className="bg-green-100 text-green-800">Success</Badge>
      case "error": return <Badge className="bg-red-100 text-red-800">Error</Badge>
      default: return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Setup Test Dashboard</h1>
          <p className="text-muted-foreground">Test your Supabase integration and form functionality</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Run Setup Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={runTests} 
              disabled={isRunning}
              className="w-full"
            >
              {isRunning ? "Running Tests..." : "Start Tests"}
            </Button>
          </CardContent>
        </Card>

        {testResults.length > 0 && (
          <div className="space-y-4">
            {testResults.map((result, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(result.status)}
                      <div>
                        <h3 className="font-semibold">{result.name}</h3>
                        <p className="text-sm text-muted-foreground">{result.message}</p>
                      </div>
                    </div>
                    {getStatusBadge(result.status)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Manual Test Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>After running the automated tests above, manually test:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><a href="/contact" className="text-primary hover:underline">Contact Form (/contact)</a> - Submit a test message</li>
                <li><a href="/book" className="text-primary hover:underline">Appointment Booking (/book)</a> - Book a test appointment</li>
                <li><a href="/login" className="text-primary hover:underline">Admin Login (/login)</a> - Login with Supabase credentials</li>
                <li><a href="/admin" className="text-primary hover:underline">Admin Dashboard (/admin)</a> - View submitted forms</li>
                <li><a href="/diagnostics" className="text-primary hover:underline">Diagnostics (/diagnostics)</a> - Use password: "admin123"</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
