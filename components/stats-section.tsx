"use client"

import { motion } from "framer-motion"
import { Users, Award, Clock, Heart } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Happy Patients",
    description: "Successfully treated",
  },
  {
    icon: Award,
    value: "5+",
    label: "Years Experience",
    description: "In physiotherapy",
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Support",
    description: "Emergency care",
  },
  {
    icon: Heart,
    value: "98%",
    label: "Success Rate",
    description: "Patient recovery",
  },
]

export function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center text-white"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <stat.icon className="w-8 h-8" />
                </div>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                viewport={{ once: true }}
                className="text-4xl font-bold font-heading mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-lg font-medium mb-1">{stat.label}</div>
              <div className="text-sm opacity-80">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
