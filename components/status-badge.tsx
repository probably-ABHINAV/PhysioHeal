
"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error' | 'running'
  children: React.ReactNode
  className?: string
}

export function StatusBadge({ status, children, className = "" }: StatusBadgeProps) {
  const getStatusClasses = () => {
    switch (status) {
      case 'success':
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25 border-0"
      case 'error':
        return "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/25 border-0"
      case 'warning':
        return "bg-gradient-to-r from-yellow-500 to-amber-500 text-black shadow-lg shadow-yellow-500/25 border-0"
      case 'running':
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 border-0 animate-pulse"
    }
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Badge className={`${getStatusClasses()} ${className}`}>
        {children}
      </Badge>
    </motion.div>
  )
}
