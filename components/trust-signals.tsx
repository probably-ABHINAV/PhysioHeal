"use client"

import { motion } from "framer-motion"
import { Shield, Award, Users, Clock } from "lucide-react"

export function TrustSignals() {
  const signals = [
    {
      icon: Shield,
      text: "Licensed & Certified Physiotherapists",
      subtext: "Government approved practitioners"
    },
    {
      icon: Award,
      text: "10+ Years Experience",
      subtext: "Treating 50,000+ patients successfully"
    },
    {
      icon: Users,
      text: "4.9/5 Patient Rating",
      subtext: "Based on 2000+ verified reviews"
    },
    {
      icon: Clock,
      text: "Same Day Appointments",
      subtext: "Quick relief when you need it most"
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Trusted Healthcare Partner
          </h2>
          <p className="text-gray-600">
            Professional physiotherapy services you can rely on
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {signals.map((signal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              viewport={{ once: true }}
              className="text-center group cursor-pointer"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <signal.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                {signal.text}
              </h3>
              <p className="text-sm text-gray-600">{signal.subtext}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}