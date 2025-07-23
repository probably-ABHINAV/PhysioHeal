
"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RefreshCw, Download, Share, AlertCircle, TrendingUp, Database, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { DiagnosticCard } from "./diagnostic-card"
import { StatusBadge } from "./status-badge"
import { ReportExporter } from "./report-exporter"
import { DiagnosticSettings } from "./diagnostic-settings"
import { diagnosticsRunner, DiagnosticResult } from "@/lib/diagnostics"

export function SupabaseDiagnostics() {
  const [results, setResults] = useState<DiagnosticResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [historicalData, setHistoricalData] = useState<any[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Only run diagnostics after component mounts to avoid hydration issues
    const timer = setTimeout(() => {
      runDiagnostics()
      loadHistoricalData()
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  const runDiagnostics = async () => {
    setIsRunning(true)
    setProgress(0)
    setResults([])

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90))
      }, 500)

      const diagnosticResults = await diagnosticsRunner.runAllTests()
      
      clearInterval(progressInterval)
      setProgress(100)
      setResults(diagnosticResults)
      
      const failedTests = diagnosticResults.filter(r => r.status === 'fail').length
      const warningTests = diagnosticResults.filter(r => r.status === 'warning').length
      
      if (failedTests > 0) {
        toast({
          title: "Diagnostics Complete",
          description: `${failedTests} tests failed, ${warningTests} warnings`,
          variant: "destructive"
        })
      } else if (warningTests > 0) {
        toast({
          title: "Diagnostics Complete",
          description: `All tests passed with ${warningTests} warnings`,
        })
      } else {
        toast({
          title: "Diagnostics Complete",
          description: "All tests passed successfully! 🎉",
        })
      }
    } catch (error) {
      console.error('Diagnostics failed:', error)
      
      // Create a mock result for display purposes
      setResults([{
        id: 'diagnostics_error',
        name: 'Diagnostics Runner',
        status: 'fail',
        message: `Diagnostics failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date(),
        suggestions: [
          'Check browser console for detailed errors',
          'Verify environment variables are set',
          'Try refreshing the page'
        ]
      }])
      
      toast({
        title: "Diagnostics Failed",
        description: "Some tests could not run - check results below",
        variant: "destructive"
      })
    } finally {
      setIsRunning(false)
      setTimeout(() => setProgress(0), 2000)
    }
  }

  const loadHistoricalData = async () => {
    try {
      const data = await diagnosticsRunner.getHistoricalData(7)
      setHistoricalData(data)
    } catch (error) {
      console.error('Failed to load historical data:', error)
    }
  }

  const handleRetry = async (testId: string) => {
    toast({
      title: "Retrying Test",
      description: "Running individual test...",
    })
    // In a real implementation, you'd retry the specific test
    await runDiagnostics()
  }

  const handleAutoFix = async (action: string) => {
    toast({
      title: "Auto Fix",
      description: `Attempting to fix: ${action}`,
    })
    
    switch (action) {
      case 'setup_env':
        toast({
          title: "Environment Setup",
          description: "Please check your environment variables configuration",
        })
        break
      default:
        toast({
          title: "Auto Fix",
          description: "Fix action not implemented yet",
        })
    }
  }

  const exportReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total: results.length,
        passed: results.filter(r => r.status === 'pass').length,
        failed: results.filter(r => r.status === 'fail').length,
        warnings: results.filter(r => r.status === 'warning').length
      },
      results: results,
      historicalData: historicalData.slice(-10) // Last 10 runs
    }

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `diagnostics-report-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Report Exported",
      description: "Diagnostics report downloaded successfully",
    })
  }

  const getOverallStatus = () => {
    if (results.length === 0) return 'unknown'
    if (results.some(r => r.status === 'fail')) return 'fail'
    if (results.some(r => r.status === 'warning')) return 'warning'
    return 'pass'
  }

  const getStatusCounts = () => {
    return {
      total: results.length,
      passed: results.filter(r => r.status === 'pass').length,
      failed: results.filter(r => r.status === 'fail').length,
      warnings: results.filter(r => r.status === 'warning').length
    }
  }

  const statusCounts = getStatusCounts()

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">System Diagnostics</h1>
          <p className="text-muted-foreground">
            Comprehensive health checks for your physiotherapy platform
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            onClick={runDiagnostics}
            disabled={isRunning}
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Running...' : 'Run Diagnostics'}</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={exportReport}
            disabled={results.length === 0}
            className="flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <AnimatePresence>
        {isRunning && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Running diagnostics...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary Cards */}
      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Database className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Tests</p>
                  <p className="text-2xl font-bold">{statusCounts.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Passed</p>
                  <p className="text-2xl font-bold text-green-600">{statusCounts.passed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-8 w-8 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Warnings</p>
                  <p className="text-2xl font-bold text-yellow-600">{statusCounts.warnings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-red-500" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Failed</p>
                  <p className="text-2xl font-bold text-red-600">{statusCounts.failed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Status</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="settings">Settings & Export</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          {results.length > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-lg font-medium">Overall Status:</span>
                <StatusBadge status={getOverallStatus()} />
              </div>
              <span className="text-sm text-muted-foreground">
                Last run: {new Date().toLocaleString()}
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {results.map((result, index) => (
              <DiagnosticCard
                key={`${result.id}-${index}`}
                result={result}
                onRetry={handleRetry}
                onAutoFix={handleAutoFix}
              />
            ))}
          </div>

          {results.length === 0 && !isRunning && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No diagnostics data</h3>
                  <p className="text-muted-foreground mb-4">
                    Click "Run Diagnostics" to perform system health checks
                  </p>
                  <Button onClick={runDiagnostics}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Run Diagnostics
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Diagnostics History</CardTitle>
              <CardDescription>
                Past diagnostic runs and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              {historicalData.length > 0 ? (
                <div className="space-y-4">
                  {historicalData.slice(-10).reverse().map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <StatusBadge status={log.run_status} />
                        <div>
                          <p className="font-medium">{log.test_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(log.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">
                          {log.logs?.summary?.total || 0} tests
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {log.logs?.summary?.failed || 0} failed
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No history available</h3>
                  <p className="text-muted-foreground">
                    Run diagnostics to start building history
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <DiagnosticSettings />
            </div>
            <ReportExporter results={results} historicalData={historicalData} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
