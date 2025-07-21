"use client"

import { motion } from "framer-motion"
import { Calendar, Phone, ArrowRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
      {/* Removed malformed background pattern */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-center">
          <motion.div 
            className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            🔥 Limited Time: First Consultation Only ₹199 (Reg. ₹599)
          </motion.div>

          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            दर्द से छुटकारा सिर्फ 24 घंटे में
            <span className="block text-blue-600">Get Relief in Just 24 Hours</span>
          </motion.h2>

          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            सर्टिफाइड फिजियोथेरेपिस्ट से बात करें। EMI उपलब्ध। 
            <strong>Insurance accepted। Home visit available।</strong>
          </motion.p>

          <motion.div 
            className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              onClick={() => window.open('https://wa.me/919876543210?text=मुझे फिजियोथेरेपी कंसल्टेशन चाहिए', '_blank')}
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp पर बुक करें
              <span className="block text-sm opacity-90">Instant Response</span>
            </Button>

            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              onClick={() => window.location.href = '/book-appointment'}
            >
              <Calendar className="h-5 w-5" />
              Online Booking
              <span className="block text-sm opacity-90">Choose Date & Time</span>
            </Button>

            <Button 
              size="lg" 
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              onClick={() => window.location.href = 'tel:+919876543210'}
            >
              <Phone className="h-5 w-5" />
              कॉल करें अभी
              <span className="block text-sm opacity-90">24/7 Available</span>
            </Button>
          </motion.div>

          <motion.div 
            className="text-center text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p>💳 Payment: Cash, UPI, Card, EMI | 🔒 100% Safe & Secure | ⏰ Same Day Appointment Available</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}