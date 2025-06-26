
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, Play, Download, ExternalLink } from "lucide-react"
import { runDiagnostics, type DiagnosticReport } from "@/lib/diagnostics"

export default function TestSetupPage() {
  const [report, setReport] = useState<DiagnosticReport | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [showJson, setShowJson] = useState(false)

  useEffect(() => {
    // Auto-run tests on page load for CI/automation
    runTests()
  }, [])

  const runTests = async () => {
    setIsRunning(true)
    try {
      const result = await runDiagnostics()
      setReport(result)
    } catch (error) {
      console.error('Test execution failed:', error)
    } finally {
      setIsRunning(false)
    }
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
      case "success": return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">✅ Pass</Badge>
      case "error": return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">❌ Fail</Badge>
      default: return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">⚠️ Warning</Badge>
    }
  }

  const exportTestResults = () => {
    if (!report) return

    const ciReport = {
      timestamp: new Date().toISOString(),
      overallStatus: report.overallStatus,
      summary: {
        total: report.results.length,
        passed: report.results.filter(r => r.status === 'success').length,
        failed: report.results.filter(r => r.status === 'error').length,
        warnings: report.results.filter(r => r.status === 'warning').length,
      },
      tests: report.results.map(r => ({
        name: r.name,
        status: r.status,
        message: r.message,
        timestamp: r.timestamp
      })),
      environment: {
        envReady: report.envReady,
        hasSession: report.hasSession,
        appointmentCount: report.appointmentCount,
        messageCount: report.messageCount,
      }
    }

    const blob = new Blob([JSON.stringify(ciReport, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `test-results-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Automated Test Suite
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive integration testing for CI/CD and development workflows
          </p>
        </motion.div>

        {/* Test Summary */}
        {report && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Test Results Summary</CardTitle>
                    <CardDescription>
                      Overall Status: <span className="font-semibold">{report.overallStatus.toUpperCase()}</span>
                    </CardDescription>
                  </div>
                  <Badge 
                    className={
                      report.overallStatus === 'success' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : report.overallStatus === 'error'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }
                  >
                    {report.overallStatus === 'success' && '✅ ALL TESTS PASSED'}
                    {report.overallStatus === 'error' && '❌ TESTS FAILED'}
                    {report.overallStatus === 'warning' && '⚠️ WARNINGS DETECTED'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                      {report.results.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Total</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {report.results.filter(r => r.status === 'success').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Passed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">
                      {report.results.filter(r => r.status === 'error').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Failed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">
                      {report.results.filter(r => r.status === 'warning').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Warnings</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30">
            <CardHeader>
              <CardTitle>Test Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={runTests} 
                  disabled={isRunning}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  <Play className={`w-4 h-4 mr-2 ${isRunning ? 'animate-spin' : ''}`} />
                  {isRunning ? "Running Tests..." : "Run Tests"}
                </Button>
                
                <Button 
                  onClick={exportTestResults}
                  variant="outline"
                  disabled={!report}
                  className="backdrop-blur-sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export JSON
                </Button>
                
                <Button 
                  onClick={() => setShowJson(!showJson)}
                  variant="outline"
                  disabled={!report}
                  className="backdrop-blur-sm"
                >
                  {showJson ? "Hide" : "Show"} Raw Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Test Results */}
        {report && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold">Test Results</h2>
            <div className="space-y-3">
              {report.results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(result.status)}
                          <div>
                            <h3 className="font-semibold">{result.name}</h3>
                            <p className="text-sm text-muted-foreground">{result.message}</p>
                            {result.details && (
                              <p className="text-xs text-muted-foreground mt-1">{result.details}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(result.status)}
                          {result.count !== undefined && (
                            <div className="text-sm text-muted-foreground mt-1">
                              Count: {result.count}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Raw JSON Output */}
        {showJson && report && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30">
              <CardHeader>
                <CardTitle>Raw Test Data (JSON)</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-black/20 dark:bg-white/5 p-4 rounded-lg overflow-x-auto max-h-96 overflow-y-auto">
                  {JSON.stringify(report, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Manual Test Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30">
            <CardHeader>
              <CardTitle>Manual Testing</CardTitle>
              <CardDescription>Test individual components manually</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {[
                  { href: "/contact", label: "Contact Form" },
                  { href: "/book", label: "Booking Form" },
                  { href: "/login", label: "Admin Login" },
                  { href: "/admin", label: "Admin Dashboard" },
                  { href: "/diagnostics", label: "Advanced Diagnostics" }
                ].map((link) => (
                  <Button
                    key={link.href}
                    variant="outline"
                    size="sm"
                    className="backdrop-blur-sm hover:bg-white/10 justify-start"
                    onClick={() => window.open(link.href, '_blank')}
                  >
                    <ExternalLink className="w-3 h-3 mr-2" />
                    {link.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
