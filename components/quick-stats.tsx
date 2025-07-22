"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { TrendingUp, Users, Clock, Award } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "2000+",
    label: "Happy Patients",
    description: "Treated successfully"
  },
  {
    icon: Award,
    value: "15+",
    label: "Years Experience",
    description: "In physiotherapy"
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "Success Rate",
    description: "Patient satisfaction"
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Support",
    description: "Emergency care"
  }
]

export function QuickStats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="py-16 bg-primary text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/5 to-transparent" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8" />
                  </div>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  className="text-3xl font-bold mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm opacity-80">{stat.description}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}