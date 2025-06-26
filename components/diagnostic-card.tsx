
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Clock, User, Database, RefreshCw, CheckCircle2, XCircle, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { DiagnosticResult } from "@/lib/diagnostics"

interface DiagnosticCardProps {
  result: DiagnosticResult
  onRerun?: () => void
  index: number
}

export function DiagnosticCard({ result, onRerun, index }: DiagnosticCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getStatusIcon = () => {
    switch (result.status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'running':
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
    }
  }

  const getStatusBadge = () => {
    switch (result.status) {
      case 'success':
        return (
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg shadow-green-500/25">
            ✅ Passed
          </Badge>
        )
      case 'error':
        return (
          <Badge className="bg-gradient-to-r from-red-500 to-rose-500 text-white border-0 shadow-lg shadow-red-500/25">
            ❌ Failed
          </Badge>
        )
      case 'warning':
        return (
          <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black border-0 shadow-lg shadow-yellow-500/25">
            ⚠️ Warning
          </Badge>
        )
      case 'running':
        return (
          <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 shadow-lg shadow-blue-500/25">
            🔄 Running
          </Badge>
        )
    }
  }

  const getGlowClass = () => {
    switch (result.status) {
      case 'success':
        return 'hover:shadow-green-500/20 border-green-500/20'
      case 'error':
        return 'hover:shadow-red-500/20 border-red-500/20'
      case 'warning':
        return 'hover:shadow-yellow-500/20 border-yellow-500/20'
      case 'running':
        return 'hover:shadow-blue-500/20 border-blue-500/20'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -2, scale: 1.02 }}
      className="group"
    >
      <Card className={`
        backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 
        border border-white/20 dark:border-gray-700/30
        transition-all duration-300 ease-out
        hover:shadow-2xl hover:shadow-white/10 dark:hover:shadow-gray-900/20
        ${getGlowClass()}
      `}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                {getStatusIcon()}
              </motion.div>
              <div>
                <CardTitle className="text-lg bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {result.name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {result.message}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusBadge()}
              {onRerun && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRerun}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Quick Stats */}
          <div className="flex items-center space-x-4 mb-3">
            {result.count !== undefined && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Database className="w-4 h-4 mr-1" />
                <span className="font-medium">{result.count}</span>
              </div>
            )}
            {result.lastEntry && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <User className="w-4 h-4 mr-1" />
                <span className="font-medium truncate max-w-[120px]">{result.lastEntry.name}</span>
              </div>
            )}
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-500 ml-auto">
              <Clock className="w-3 h-3 mr-1" />
              {new Date(result.timestamp).toLocaleTimeString()}
            </div>
          </div>

          {/* Expandable Details */}
          {result.details && (
            <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-between text-xs p-2 h-auto hover:bg-white/5"
                >
                  <span>View Details</span>
                  {isExpanded ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 p-3 rounded-lg bg-black/5 dark:bg-white/5 border border-white/10"
                >
                  <pre className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                    {result.details}
                  </pre>
                  {result.lastEntry && (
                    <div className="mt-2 pt-2 border-t border-white/10">
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Last entry: {new Date(result.lastEntry.created_at).toLocaleString()}
                      </p>
                    </div>
                  )}
                </motion.div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
