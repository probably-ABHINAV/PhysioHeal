
'use client'

import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { ReactNode } from 'react'

interface AnimatedButtonProps {
  children: ReactNode
  onClick?: () => void
  loading?: boolean
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'default' | 'lg'
  className?: string
  disabled?: boolean
}

export function AnimatedButton({
  children,
  onClick,
  loading = false,
  variant = 'default',
  size = 'default',
  className = '',
  disabled = false
}: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        variant={variant}
        size={size}
        className={`relative overflow-hidden transition-all duration-300 ${className}`}
        onClick={onClick}
        disabled={disabled || loading}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
        
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        
        <span className="relative z-10">{children}</span>
        
        <motion.div
          className="absolute inset-0 rounded-lg"
          initial={{ opacity: 0 }}
          whileHover={{ 
            opacity: 1,
            boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)"
          }}
          transition={{ duration: 0.3 }}
        />
      </Button>
    </motion.div>
  )
}
