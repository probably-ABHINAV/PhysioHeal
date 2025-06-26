"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, XCircle, AlertCircle, Database, Key, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"

interface DiagnosticResult {
  name: string
  status: "success" | "error" | "warning"
  message: string
  details?: string
}

export function SupabaseDiagnostics() {
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const runDiagnostics = async () => {
    setIsRunning(true)
    const results: DiagnosticResult[] = []

    // 1. Check Environment Variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    results.push({
      name: "Environment Variables",
      status: supabaseUrl && supabaseAnonKey ? "success" : "error",
      message: supabaseUrl && supabaseAnonKey ? "Environment variables are set" : "Missing environment variables",
      details: `URL: ${supabaseUrl ? "✓ Set" : "✗ Missing"}, Key: ${supabaseAnonKey ? "✓ Set" : "✗ Missing"}`,
    })

    // 2. Check Supabase Client Creation
    results.push({
      name: "Supabase Client",
      status: supabase ? "success" : "error",
      message: supabase ? "Supabase client created successfully" : "Failed to create Supabase client",
      details: supabase ? "Client is ready for use" : "Check your environment variables",
    })

    // 3. Test Database Connection
    if (supabase) {
      try {
        const { data, error } = await supabase.from("reviews").select("count", { count: "exact", head: true })

        if (error) {
          if (error.code === "42P01" || error.message.includes("does not exist")) {
            results.push({
              name: "Database Table",
              status: "warning",
              message: "Reviews table does not exist",
              details: "Run the SQL script to create the reviews table",
            })
          } else {
            results.push({
              name: "Database Connection",
              status: "error",
              message: "Database connection failed",
              details: error.message,
            })
          }
        } else {
          results.push({
            name: "Database Connection",
            status: "success",
            message: "Successfully connected to database",
            details: `Reviews table exists with ${data?.[0]?.count || 0} records`,
          })
        }
      } catch (err) {
        results.push({
          name: "Database Connection",
          status: "error",
          message: "Failed to connect to database",
          details: err instanceof Error ? err.message : "Unknown error",
        })
      }

      // 4. Test Insert Permission (RLS Check)
      try {
        const testReview = {
          name: "Test User",
          rating: 5,
          comment: "This is a test review to check permissions",
          service: "Test Service",
        }

        const { data, error } = await supabase.from("reviews").insert([testReview]).select().single()

        if (error) {
          // More robust error checking
          const errorMessage = error.message || String(error)
          const errorCode = (error as any).code || ""

          if (errorCode === "42501" || errorMessage.toLowerCase().includes("permission")) {
            results.push({
              name: "Insert Permissions",
              status: "warning",
              message: "RLS (Row Level Security) is blocking inserts",
              details: "You may need to disable RLS or create policies for the reviews table",
            })
          } else if (errorCode === "42P01" || errorMessage.toLowerCase().includes("does not exist")) {
            results.push({
              name: "Insert Permissions",
              status: "warning",
              message: "Cannot test permissions - table does not exist",
              details: "Create the reviews table first, then test permissions",
            })
          } else {
            results.push({
              name: "Insert Permissions",
              status: "error",
              message: "Failed to insert test record",
              details: `Error: ${errorMessage} (Code: ${errorCode})`,
            })
          }
        } else {
          results.push({
            name: "Insert Permissions",
            status: "success",
            message: "Successfully inserted test record",
            details: "RLS permissions are correctly configured",
          })

          // Clean up test record
          if (data?.id) {
            await supabase.from("reviews").delete().eq("id", data.id)
          }
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err)
        results.push({
          name: "Insert Permissions",
          status: "error",
          message: "Failed to test insert permissions",
          details: `Unexpected error: ${errorMessage}`,
        })
      }
    }

    setDiagnostics(results)
    setIsRunning(false)
  }

  useEffect(() => {
    runDiagnostics()
  }, [])

  const getStatusIcon = (status: DiagnosticResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: DiagnosticResult["status"]) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Success</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Warning</Badge>
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
        <h1 className="text-3xl font-heading font-bold mb-4">
          <Database className="w-8 h-8 inline mr-3 text-primary" />
          Supabase Diagnostics
        </h1>
        <p className="text-muted-foreground mb-6">Check your Supabase configuration and database connectivity</p>
        <Button onClick={runDiagnostics} disabled={isRunning} className="btn-3d">
          {isRunning ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Running Diagnostics...
            </>
          ) : (
            <>
              <Database className="w-4 h-4 mr-2" />
              Run Diagnostics
            </>
          )}
        </Button>
      </motion.div>

      <div className="grid gap-6">
        {diagnostics.map((diagnostic, index) => (
          <motion.div
            key={diagnostic.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-3d">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold flex items-center">
                  {getStatusIcon(diagnostic.status)}
                  <span className="ml-3">{diagnostic.name}</span>
                </CardTitle>
                {getStatusBadge(diagnostic.status)}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{diagnostic.message}</p>
                {diagnostic.details && (
                  <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">{diagnostic.details}</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Environment Variables Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="w-5 h-5 mr-2 text-primary" />
              Environment Variables Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                <span className="font-medium">NEXT_PUBLIC_SUPABASE_URL</span>
                <div className="flex items-center">
                  {process.env.NEXT_PUBLIC_SUPABASE_URL ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm text-green-600">Set</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-500 mr-2" />
                      <span className="text-sm text-red-600">Missing</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                <span className="font-medium">NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
                <div className="flex items-center">
                  {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm text-green-600">Set</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-500 mr-2" />
                      <span className="text-sm text-red-600">Missing</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Setup Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8"
      >
        <Card className="card-3d border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center text-primary">
              <Globe className="w-5 h-5 mr-2" />
              Setup Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">1. Create .env.local file</h4>
                <p className="text-muted-foreground mb-2">
                  Create a file named <code className="bg-muted px-1 rounded">.env.local</code> in your project root
                  with:
                </p>
                <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                  {`NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">2. Create Reviews Table</h4>
                <p className="text-muted-foreground">
                  Run the SQL script <code className="bg-muted px-1 rounded">scripts/create-reviews-table.sql</code> in
                  your Supabase SQL editor.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">3. Configure RLS (Optional)</h4>
                <p className="text-muted-foreground">
                  If you want to allow public inserts, disable RLS on the reviews table or create appropriate policies.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
