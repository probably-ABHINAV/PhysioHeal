
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, FileText, Mail, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { DiagnosticResult } from "@/lib/diagnostics"

interface ReportExporterProps {
  results: DiagnosticResult[]
  historicalData?: any[]
}

export function ReportExporter({ results, historicalData = [] }: ReportExporterProps) {
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const generateReport = () => {
    const summary = {
      total: results.length,
      passed: results.filter(r => r.status === 'pass').length,
      failed: results.filter(r => r.status === 'fail').length,
      warnings: results.filter(r => r.status === 'warning').length
    }

    return {
      metadata: {
        generatedAt: new Date().toISOString(),
        version: "1.0.0",
        title: "Physiotherapy Platform Diagnostics Report"
      },
      summary,
      overallStatus: summary.failed > 0 ? 'CRITICAL' : summary.warnings > 0 ? 'WARNING' : 'HEALTHY',
      results: results.map(result => ({
        name: result.name,
        status: result.status,
        message: result.message,
        duration: result.duration,
        timestamp: result.timestamp,
        suggestions: result.suggestions || []
      })),
      recommendations: generateRecommendations(results),
      historicalTrends: historicalData.slice(-30) // Last 30 runs
    }
  }

  const generateRecommendations = (results: DiagnosticResult[]) => {
    const recommendations = []
    
    const failedTests = results.filter(r => r.status === 'fail')
    const warningTests = results.filter(r => r.status === 'warning')
    
    if (failedTests.length > 0) {
      recommendations.push({
        priority: 'HIGH',
        category: 'Critical Issues',
        description: `${failedTests.length} critical tests are failing and require immediate attention`,
        actions: failedTests.flatMap(test => test.suggestions || [])
      })
    }
    
    if (warningTests.length > 0) {
      recommendations.push({
        priority: 'MEDIUM',
        category: 'Performance Optimization',
        description: `${warningTests.length} tests show warnings that could be optimized`,
        actions: warningTests.flatMap(test => test.suggestions || [])
      })
    }
    
    if (failedTests.length === 0 && warningTests.length === 0) {
      recommendations.push({
        priority: 'LOW',
        category: 'Maintenance',
        description: 'All systems are healthy. Consider implementing proactive monitoring',
        actions: [
          'Set up automated daily diagnostics',
          'Configure email alerts for failures',
          'Review performance trends weekly'
        ]
      })
    }
    
    return recommendations
  }

  const exportAsJSON = async () => {
    setIsExporting(true)
    try {
      const report = generateReport()
      const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
      downloadFile(blob, 'diagnostics-report.json')
      
      toast({
        title: "JSON Report Exported",
        description: "Diagnostic report downloaded as JSON file",
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export JSON report",
        variant: "destructive"
      })
    } finally {
      setIsExporting(false)
    }
  }

  const exportAsMarkdown = async () => {
    setIsExporting(true)
    try {
      const report = generateReport()
      const markdown = generateMarkdownReport(report)
      const blob = new Blob([markdown], { type: 'text/markdown' })
      downloadFile(blob, 'diagnostics-report.md')
      
      toast({
        title: "Markdown Report Exported",
        description: "Diagnostic report downloaded as Markdown file",
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export Markdown report",
        variant: "destructive"
      })
    } finally {
      setIsExporting(false)
    }
  }

  const generateMarkdownReport = (report: any) => {
    return `# ${report.metadata.title}

**Generated:** ${new Date(report.metadata.generatedAt).toLocaleString()}  
**Overall Status:** ${report.overallStatus}

## Summary

- **Total Tests:** ${report.summary.total}
- **Passed:** ✅ ${report.summary.passed}
- **Failed:** ❌ ${report.summary.failed}
- **Warnings:** ⚠️ ${report.summary.warnings}

## Test Results

${report.results.map((result: any) => `
### ${result.name}

**Status:** ${result.status.toUpperCase()}  
**Duration:** ${result.duration}ms  
**Message:** ${result.message}

${result.suggestions.length > 0 ? `**Suggestions:**
${result.suggestions.map((s: string) => `- ${s}`).join('\n')}` : ''}
`).join('\n')}

## Recommendations

${report.recommendations.map((rec: any) => `
### ${rec.category} (${rec.priority} Priority)

${rec.description}

**Actions:**
${rec.actions.map((action: string) => `- ${action}`).join('\n')}
`).join('\n')}

---
*Generated by Physiotherapy Platform Diagnostics*
`
  }

  const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const shareReport = async () => {
    const report = generateReport()
    const summary = `Diagnostics Report: ${report.overallStatus}\n${report.summary.total} tests - ${report.summary.passed} passed, ${report.summary.failed} failed, ${report.summary.warnings} warnings`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'System Diagnostics Report',
          text: summary,
        })
        toast({
          title: "Report Shared",
          description: "Diagnostics summary shared successfully",
        })
      } catch (error) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(summary)
        toast({
          title: "Copied to Clipboard",
          description: "Diagnostics summary copied to clipboard",
        })
      }
    } else {
      await navigator.clipboard.writeText(summary)
      toast({
        title: "Copied to Clipboard",
        description: "Diagnostics summary copied to clipboard",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Export Report</span>
        </CardTitle>
        <CardDescription>
          Generate and download diagnostic reports in various formats
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="export" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="export">Export</TabsTrigger>
            <TabsTrigger value="share">Share</TabsTrigger>
          </TabsList>
          
          <TabsContent value="export" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                onClick={exportAsJSON}
                disabled={isExporting || results.length === 0}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>JSON Report</span>
              </Button>
              
              <Button
                onClick={exportAsMarkdown}
                disabled={isExporting || results.length === 0}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Markdown Report</span>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="share" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                onClick={shareReport}
                disabled={results.length === 0}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Share2 className="h-4 w-4" />
                <span>Share Summary</span>
              </Button>
              
              <Button
                disabled
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Mail className="h-4 w-4" />
                <span>Email Report</span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Email functionality will be available in a future update
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
