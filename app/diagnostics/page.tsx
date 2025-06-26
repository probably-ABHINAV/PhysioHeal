
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  RefreshCw, 
  Download, 
  Settings, 
  Activity, 
  Shield,
  Database,
  Zap,
  TrendingUp,
  Clock,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { ProtectedWrapper } from "@/components/protected-wrapper"
import { DiagnosticCard } from "@/components/diagnostic-card"
import { StatusBadge } from "@/components/status-badge"
import { runDiagnostics, cleanupTestData, type DiagnosticReport } from "@/lib/diagnostics"

export default function DiagnosticsPage() {
  const [report, setReport] = useState<DiagnosticReport | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null)
  const [lastRun, setLastRun] = useState<Date | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    runInitialDiagnostics()
  }, [])

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        runDiagnosticsInternal()
      }, 30000) // 30 seconds
      setRefreshInterval(interval)
    } else {
      if (refreshInterval) {
        clearInterval(refreshInterval)
        setRefreshInterval(null)
      }
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval)
      }
    }
  }, [autoRefresh])

  const runInitialDiagnostics = async () => {
    setIsRunning(true)
    try {
      const result = await runDiagnostics()
      setReport(result)
      setLastRun(new Date())
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to run diagnostics",
        variant: "destructive"
      })
    } finally {
      setIsRunning(false)
    }
  }

  const runDiagnosticsInternal = async () => {
    if (isRunning) return
    
    setIsRunning(true)
    try {
      const result = await runDiagnostics()
      setReport(result)
      setLastRun(new Date())
      
      if (result.overallStatus === 'error') {
        toast({
          title: "System Issues Detected",
          description: "Some diagnostic tests failed. Check the dashboard for details.",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to run diagnostics",
        variant: "destructive"
      })
    } finally {
      setIsRunning(false)
    }
  }

  const handleCleanup = async () => {
    try {
      await cleanupTestData()
      toast({
        title: "Success",
        description: "Test data cleaned up successfully"
      })
      runDiagnosticsInternal()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cleanup test data",
        variant: "destructive"
      })
    }
  }

  const exportReport = () => {
    if (!report) return

    const exportData = {
      timestamp: new Date().toISOString(),
      report,
      summary: {
        overallStatus: report.overallStatus,
        totalTests: report.results.length,
        passedTests: report.results.filter(r => r.status === 'success').length,
        failedTests: report.results.filter(r => r.status === 'error').length,
        warningTests: report.results.filter(r => r.status === 'warning').length,
      }
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `diagnostics-report-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Success",
      description: "Diagnostic report exported"
    })
  }

  const getOverallStatusIcon = () => {
    if (!report) return <Activity className="w-6 h-6" />
    
    switch (report.overallStatus) {
      case 'success':
        return <Zap className="w-6 h-6 text-green-500" />
      case 'warning':
        return <AlertCircle className="w-6 h-6 text-yellow-500" />
      case 'error':
        return <AlertCircle className="w-6 h-6 text-red-500" />
    }
  }

  return (
    <ProtectedWrapper 
      title="Advanced Diagnostics"
      description="Protected system diagnostics dashboard"
      fallbackPassword="admin123"
    >
      <div className="pt-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <div className="flex items-center justify-center space-x-3">
              <motion.div
                animate={{ rotate: isRunning ? 360 : 0 }}
                transition={{ duration: 1, repeat: isRunning ? Infinity : 0, ease: "linear" }}
              >
                {getOverallStatusIcon()}
              </motion.div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                System Diagnostics
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive health monitoring and performance analysis for your physiotherapy platform
            </p>
          </motion.div>

          {/* Status Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>System Overview</span>
                    </CardTitle>
                    <CardDescription>
                      {lastRun && `Last updated: ${lastRun.toLocaleString()}`}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    {report && (
                      <StatusBadge status={report.overallStatus}>
                        {report.overallStatus === 'success' && '✅ All Systems Operational'}
                        {report.overallStatus === 'warning' && '⚠️ Some Issues Detected'}
                        {report.overallStatus === 'error' && '❌ Critical Issues Found'}
                      </StatusBadge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">
                      {report?.results.filter(r => r.status === 'success').length || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Passed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-500">
                      {report?.results.filter(r => r.status === 'warning').length || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Warnings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-500">
                      {report?.results.filter(r => r.status === 'error').length || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Failed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500">
                      {(report?.appointmentCount || 0) + (report?.messageCount || 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Records</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Control Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Control Panel</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    onClick={runDiagnosticsInternal}
                    disabled={isRunning}
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isRunning ? 'animate-spin' : ''}`} />
                    {isRunning ? 'Running...' : 'Run Diagnostics'}
                  </Button>
                  
                  <Button
                    onClick={exportReport}
                    variant="outline"
                    disabled={!report}
                    className="backdrop-blur-sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                  
                  <Button
                    onClick={handleCleanup}
                    variant="outline"
                    className="backdrop-blur-sm"
                  >
                    <Database className="w-4 h-4 mr-2" />
                    Cleanup Test Data
                  </Button>
                  
                  <Separator orientation="vertical" className="h-8" />
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="auto-refresh"
                      checked={autoRefresh}
                      onCheckedChange={setAutoRefresh}
                    />
                    <Label htmlFor="auto-refresh" className="text-sm">
                      Auto-refresh (30s)
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Diagnostic Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold flex items-center space-x-2">
              <TrendingUp className="w-6 h-6" />
              <span>Diagnostic Results</span>
            </h2>
            
            <AnimatePresence mode="wait">
              {isRunning && !report ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                  <p className="text-muted-foreground">Running comprehensive diagnostics...</p>
                </motion.div>
              ) : report ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {report.results.map((result, index) => (
                    <DiagnosticCard
                      key={`${result.name}-${index}`}
                      result={result}
                      onRerun={runDiagnosticsInternal}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Activity className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Click "Run Diagnostics" to start system analysis</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30">
              <CardHeader>
                <CardTitle>Manual Testing Links</CardTitle>
                <CardDescription>Test individual components manually</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {[
                    { href: "/contact", label: "Contact Form" },
                    { href: "/book", label: "Booking Form" },
                    { href: "/login", label: "Admin Login" },
                    { href: "/admin", label: "Admin Dashboard" },
                    { href: "/test-setup", label: "Public Tests" }
                  ].map((link) => (
                    <Button
                      key={link.href}
                      variant="outline"
                      size="sm"
                      className="backdrop-blur-sm hover:bg-white/10"
                      onClick={() => window.open(link.href, '_blank')}
                    >
                      {link.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </ProtectedWrapper>
  )
}
