
"use client"

import { useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Heart, Users, Award, Clock, Star, Shield } from "lucide-react"

export function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const stats = [
    {
      icon: Users,
      number: 500,
      suffix: "+",
      label: "Patients Treated",
      description: "Successfully recovered patients",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Award,
      number: 95,
      suffix: "%",
      label: "Success Rate",
      description: "Patient satisfaction rating",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Clock,
      number: 5,
      suffix: "+",
      label: "Years Experience",
      description: "Professional expertise",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Heart,
      number: 1000,
      suffix: "+",
      label: "Sessions Completed",
      description: "Treatment sessions delivered",
      color: "from-red-500 to-pink-500"
    }
  ]

  return (
    <section ref={ref} className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3),transparent)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trusted by <span className="gradient-text">Hundreds</span> of Patients
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our commitment to excellence is reflected in our results and the trust our patients place in us.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <StatCard 
              key={stat.label} 
              stat={stat} 
              index={index} 
              isInView={isInView} 
            />
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Star,
              title: "5-Star Reviews",
              description: "Consistently rated excellent by our patients on Google and Facebook",
              color: "text-yellow-500"
            },
            {
              icon: Shield,
              title: "Licensed & Insured",
              description: "Fully licensed physiotherapists with comprehensive insurance coverage",
              color: "text-green-500"
            },
            {
              icon: Award,
              title: "Certified Excellence",
              description: "Continuous education and certification in the latest treatment methods",
              color: "text-blue-500"
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 hover:shadow-lg transition-all duration-300"
            >
              <item.icon className={`h-12 w-12 ${item.color} mx-auto mb-4`} />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function StatCard({ stat, index, isInView }: { stat: any, index: number, isInView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const timer = setTimeout(() => {
      let start = 0
      const end = stat.number
      const duration = 2000
      const increment = end / (duration / 16)

      const counter = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(counter)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(counter)
    }, index * 200)

    return () => clearTimeout(timer)
  }, [isInView, stat.number, index])

  const Icon = stat.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      className="group"
    >
      <div className="relative p-8 bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200/50 overflow-hidden">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
        
        {/* Icon */}
        <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-8 w-8 text-white" />
        </div>

        {/* Number */}
        <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          {count}{stat.suffix}
        </div>

        {/* Label */}
        <h3 className="text-lg font-semibold text-slate-800 mb-2">
          {stat.label}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground">
          {stat.description}
        </p>

        {/* Decorative Element */}
        <div className={`absolute top-4 right-4 w-20 h-20 bg-gradient-to-br ${stat.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
      </div>
    </motion.div>
  )
}
