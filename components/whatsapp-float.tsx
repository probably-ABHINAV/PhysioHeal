"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X, Phone, Calendar, HelpCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show after 3 seconds
    const timer = setTimeout(() => setIsVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  const phoneNumber = "+1234567890" // Replace with actual WhatsApp number

  const quickActions = [
    {
      title: "Book Appointment",
      message: "Hi! I'd like to book a physiotherapy consultation. When is your next available slot?",
      icon: Calendar,
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "Emergency Contact",
      message: "Hi! I need urgent physiotherapy assistance. Is anyone available to help?",
      icon: Phone,
      color: "bg-red-600 hover:bg-red-700"
    },
    {
      title: "General Inquiry",
      message: "Hi! I have some questions about your physiotherapy services. Could you help me?",
      icon: HelpCircle,
      color: "bg-purple-600 hover:bg-purple-700"
    }
  ]

  const openWhatsApp = (message: string) => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
    setIsOpen(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4"
          >
            <Card className="w-80 bg-white shadow-2xl border-0 overflow-hidden">
              <CardContent className="p-0">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <MessageCircle className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">PhysioHeal Clinic</h3>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                          <p className="text-xs text-green-100">Online - Typically replies instantly</p>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:bg-white/20 h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 bg-gray-50">
                  <div className="space-y-4">
                    {/* Welcome Message */}
                    <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-green-500">
                      <p className="text-sm text-gray-700">
                        👋 <strong>Welcome to PhysioHeal!</strong>
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        How can we assist you with your physiotherapy needs today?
                      </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Quick Actions</p>
                      {quickActions.map((action, index) => {
                        const Icon = action.icon
                        return (
                          <motion.div
                            key={action.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Button
                              onClick={() => openWhatsApp(action.message)}
                              variant="outline"
                              className="w-full justify-start hover:bg-gray-100 transition-colors group"
                            >
                              <div className={`w-8 h-8 rounded-full ${action.color} flex items-center justify-center mr-3 group-hover:scale-110 transition-transform`}>
                                <Icon className="h-4 w-4 text-white" />
                              </div>
                              <span className="text-sm font-medium">{action.title}</span>
                            </Button>
                          </motion.div>
                        )
                      })}
                    </div>

                    {/* Direct Chat Button */}
                    <div className="pt-2 border-t border-gray-200">
                      <Button
                        onClick={() => openWhatsApp("Hi! I'd like to chat with someone about physiotherapy services.")}
                        className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-md"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Start Chat
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 500, damping: 30 }}
      >
        <Button
          size="lg"
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6 text-white relative z-10" />
              </motion.div>
            ) : (
              <motion.div
                key="whatsapp"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="h-6 w-6 text-white relative z-10" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse animation */}
          {!isOpen && (
            <>
              <div className="absolute inset-0 rounded-full border-4 border-green-400 animate-ping opacity-30" />
              <div className="absolute inset-0 rounded-full border-2 border-green-300 animate-pulse opacity-50" />
            </>
          )}
        </Button>
      </motion.div>
    </div>
  )
}