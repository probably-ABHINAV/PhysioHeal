
"use client"

import { motion } from "framer-motion"
import { AlertCircle, Phone, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export function EmergencyCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="fixed bottom-20 right-4 z-40 max-w-sm"
    >
      <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-900 dark:text-red-100 text-sm">
                Emergency Consultation
              </h3>
              <p className="text-xs text-red-700 dark:text-red-300 mb-3">
                Acute pain or urgent physiotherapy needs?
              </p>
              <div className="flex items-center space-x-2 text-xs text-red-600 dark:text-red-400 mb-3">
                <Clock className="w-3 h-3" />
                <span>Available 24/7</span>
              </div>
              <Button size="sm" className="w-full bg-red-600 hover:bg-red-700" asChild>
                <Link href="tel:+917979855427">
                  <Phone className="w-3 h-3 mr-2" />
                  Emergency Call
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
