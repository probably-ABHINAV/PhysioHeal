
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, Calendar, Home, User } from 'lucide-react'
import { Button } from './ui/button'

export function MobileBottomNav() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919876543210?text=Hello, I need physiotherapy consultation', '_blank')
  }

  const handleCallClick = () => {
    window.location.href = 'tel:+919876543210'
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg md:hidden"
        >
          <div className="flex items-center justify-around py-2 px-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 text-xs"
              onClick={() => window.location.href = '/'}
            >
              <Home className="h-5 w-5" />
              Home
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 text-xs"
              onClick={handleCallClick}
            >
              <Phone className="h-5 w-5 text-green-600" />
              Call Now
            </Button>

            <Button
              size="sm"
              className="flex flex-col items-center gap-1 text-xs bg-blue-600 hover:bg-blue-700"
              onClick={() => window.location.href = '/book-appointment'}
            >
              <Calendar className="h-5 w-5" />
              Book Now
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 text-xs"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="h-5 w-5 text-green-500" />
              WhatsApp
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 text-xs"
              onClick={() => window.location.href = '/login'}
            >
              <User className="h-5 w-5" />
              Profile
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
