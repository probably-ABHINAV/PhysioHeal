
"use client"

import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react"

interface StatusBadgeProps {
  status: 'pass' | 'fail' | 'warning' | 'running'
  showIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function StatusBadge({ status, showIcon = true, size = 'md' }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'pass':
        return {
          variant: 'default' as const,
          label: 'PASS',
          icon: CheckCircle,
          className: 'bg-green-100 text-green-800 border-green-200'
        }
      case 'fail':
        return {
          variant: 'destructive' as const,
          label: 'FAIL',
          icon: XCircle,
          className: 'bg-red-100 text-red-800 border-red-200'
        }
      case 'warning':
        return {
          variant: 'secondary' as const,
          label: 'WARNING',
          icon: AlertTriangle,
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
        }
      case 'running':
        return {
          variant: 'outline' as const,
          label: 'RUNNING',
          icon: Clock,
          className: 'bg-blue-100 text-blue-800 border-blue-200 animate-pulse'
        }
      default:
        return {
          variant: 'outline' as const,
          label: 'UNKNOWN',
          icon: Clock,
          className: 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  }

  return (
    <Badge 
      variant={config.variant}
      className={`${config.className} ${sizeClasses[size]} flex items-center space-x-1`}
    >
      {showIcon && <Icon className={`${size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'}`} />}
      <span>{config.label}</span>
    </Badge>
  )
}
