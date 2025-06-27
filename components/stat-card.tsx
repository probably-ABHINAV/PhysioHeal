
"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: number
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'emerald' | 'red'
  urgent?: boolean
}

export function StatCard({ title, value, icon: Icon, trend = 0, color = 'blue', urgent = false }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (typeof value === 'number') {
      const timer = setTimeout(() => {
        setDisplayValue(value)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [value])

  const colorClasses = {
    blue: {
      bg: 'from-blue-50 to-blue-100',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      text: 'text-blue-800'
    },
    green: {
      bg: 'from-green-50 to-emerald-100',
      border: 'border-green-200',
      icon: 'text-green-600',
      text: 'text-green-800'
    },
    orange: {
      bg: 'from-orange-50 to-amber-100',
      border: 'border-orange-200',
      icon: 'text-orange-600',
      text: 'text-orange-800'
    },
    purple: {
      bg: 'from-purple-50 to-violet-100',
      border: 'border-purple-200',
      icon: 'text-purple-600',
      text: 'text-purple-800'
    },
    emerald: {
      bg: 'from-emerald-50 to-teal-100',
      border: 'border-emerald-200',
      icon: 'text-emerald-600',
      text: 'text-emerald-800'
    },
    red: {
      bg: 'from-red-50 to-rose-100',
      border: 'border-red-200',
      icon: 'text-red-600',
      text: 'text-red-800'
    }
  }

  const classes = colorClasses[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="relative"
    >
      <Card className={`bg-gradient-to-br ${classes.bg} ${classes.border} ${urgent ? 'ring-2 ring-red-400 ring-opacity-50' : ''} backdrop-blur-sm`}>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <div className="flex items-center space-x-2">
                <motion.p 
                  className={`text-2xl font-bold ${classes.text}`}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  {typeof value === 'number' ? (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {displayValue.toLocaleString()}
                    </motion.span>
                  ) : (
                    value
                  )}
                </motion.p>
                {trend !== 0 && (
                  <Badge 
                    variant={trend > 0 ? "default" : "secondary"}
                    className={`text-xs ${trend > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                  >
                    {trend > 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(trend)}%
                  </Badge>
                )}
              </div>
            </div>
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Icon className={`h-8 w-8 ${classes.icon}`} />
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {urgent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"
        />
      )}
    </motion.div>
  )
}
