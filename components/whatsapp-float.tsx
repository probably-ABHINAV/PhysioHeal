"use client"

import { MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const timer = setTimeout(() => {
      setIsVisible(true)
      // Show tooltip after 3 seconds for first-time users
      const hasSeenTooltip = localStorage.getItem("whatsapp-tooltip-seen")
      if (!hasSeenTooltip) {
        setTimeout(() => {
          setShowTooltip(true)
          localStorage.setItem("whatsapp-tooltip-seen", "true")
          setTimeout(() => setShowTooltip(false), 5000)
        }, 3000)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleWhatsAppClick = () => {
    const phoneNumber = "+911234567890"
    const message = encodeURIComponent("Hi! I would like to know more about your physiotherapy services.")
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  const handleCallClick = () => {
    window.location.href = "tel:+917979855427"
  }

  return (
    <AnimatePresence>
      {isVisible && isClient && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end space-y-3">
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded-lg shadow-lg border text-sm max-w-[200px] mr-2"
              >
                Need help? Chat with us on WhatsApp!
                <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-white dark:bg-gray-800 rotate-45 border-r border-b"></div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Call Button - Mobile Only */}
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ delay: 0.2 }}
            className="sm:hidden"
          >
            <Button
              onClick={handleCallClick}
              className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg"
              size="icon"
              aria-label="Call PhysioHeal Clinic"
            >
              <Phone className="w-5 h-5 text-white" />
            </Button>
          </motion.div>

          {/* WhatsApp Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ delay: 0.1 }}
          >
            <Button
              onClick={handleWhatsAppClick}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg pulse-glow-3d group relative overflow-hidden"
              size="icon"
              aria-label="Chat with PhysioHeal Clinic on WhatsApp"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10" />

              {/* Ripple Effect */}
              <motion.div
                className="absolute inset-0 bg-green-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0.3, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </Button>
          </motion.div>

          {/* Online Status Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-md text-xs mr-2"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600 dark:text-gray-300 font-medium">Online</span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}