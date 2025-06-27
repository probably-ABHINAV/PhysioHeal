"use client"

import { motion } from "framer-motion"
import { CheckCircle, XCircle, AlertTriangle, Clock, RefreshCw, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DiagnosticResult } from "@/lib/diagnostics"
import { useState } from "react"

interface DiagnosticCardProps {
  result: DiagnosticResult
  onRetry?: (testId: string) => void
  onAutoFix?: (action: string) => void
}

export function DiagnosticCard({ result, onRetry, onAutoFix }: DiagnosticCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getStatusIcon = () => {
    switch (result.status) {
      case 'pass':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'running':
        return <Clock className="h-5 w-5 text-blue-500 animate-pulse" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = () => {
    switch (result.status) {
      case 'pass':
        return 'border-green-200 bg-green-50'
      case 'fail':
        return 'border-red-200 bg-red-50'
      case 'warning':
        return 'border-yellow-200 bg-yellow-50'
      case 'running':
        return 'border-blue-200 bg-blue-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className={`${getStatusColor()} transition-all duration-200 hover:shadow-md`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon()}
              <div>
                <CardTitle className="text-lg">{result.name}</CardTitle>
                <CardDescription className="text-sm">
                  {result.duration && `${result.duration}ms`}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge 
                variant={result.status === 'pass' ? 'default' : 
                        result.status === 'fail' ? 'destructive' : 'secondary'}
              >
                {result.status.toUpperCase()}
              </Badge>
              {result.status === 'fail' && onRetry && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onRetry(result.id)}
                  className="h-8 w-8 p-0"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-3">
            {result.message}
          </p>

          {result.suggestions && result.suggestions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">💡 Suggestions:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {result.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.autoFixAction && onAutoFix && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3"
            >
              <Button
                size="sm"
                onClick={() => onAutoFix(result.autoFixAction!)}
                className="flex items-center space-x-2"
              >
                <Zap className="h-4 w-4" />
                <span>Auto Fix</span>
              </Button>
            </motion.div>
          )}

          {result.details && (
            <div className="mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs"
              >
                {isExpanded ? 'Hide Details' : 'Show Details'}
              </Button>

              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 p-3 bg-gray-100 rounded-md"
                >
                  <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                    {JSON.stringify(result.details, null, 2)}
                  </pre>
                </motion.div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}