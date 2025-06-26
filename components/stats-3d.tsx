"use client"

import { useState } from "react"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Users, Award, Clock, Heart, TrendingUp, Shield } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "Happy Patients",
    description: "Successfully treated",
    color: "from-blue-500 to-cyan-500",
    delay: 0,
  },
  {
    icon: Award,
    value: 5,
    suffix: "+",
    label: "Years Experience",
    description: "In physiotherapy",
    color: "from-purple-500 to-pink-500",
    delay: 0.2,
  },
  {
    icon: Clock,
    value: 24,
    suffix: "/7",
    label: "Support Available",
    description: "Emergency care",
    color: "from-green-500 to-emerald-500",
    delay: 0.4,
  },
  {
    icon: Heart,
    value: 98,
    suffix: "%",
    label: "Success Rate",
    description: "Patient recovery",
    color: "from-red-500 to-rose-500",
    delay: 0.6,
  },
  {
    icon: TrendingUp,
    value: 150,
    suffix: "+",
    label: "Treatments Monthly",
    description: "Growing practice",
    color: "from-orange-500 to-yellow-500",
    delay: 0.8,
  },
  {
    icon: Shield,
    value: 100,
    suffix: "%",
    label: "Safety Record",
    description: "Zero incidents",
    color: "from-indigo-500 to-blue-500",
    delay: 1,
  },
]

function CountUpAnimation({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView) {
      const timer = setInterval(() => {
        setCount((prev) => {
          const increment = value / (duration * 60) // 60fps
          const next = prev + increment
          return next >= value ? value : next
        })
      }, 1000 / 60)

      const timeout = setTimeout(() => {
        clearInterval(timer)
        setCount(value)
      }, duration * 1000)

      return () => {
        clearInterval(timer)
        clearTimeout(timeout)
      }
    }
  }, [inView, value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {Math.floor(count)}
      {suffix}
    </span>
  )
}

export function Stats3D() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true })

  return (
    <section className="py-32 bg-gradient-to-br from-primary via-primary to-secondary relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%),
                             radial-gradient(circle at 40% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
            backgroundSize: "100% 100%",
          }}
        />
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Our Impact in Numbers</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Real results that speak to our commitment to excellence in physiotherapy care
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: stat.delay,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
                z: 50,
              }}
              className="group"
            >
              <div className="relative h-full">
                {/* Card Background */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl" />

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`}
                />

                {/* Content */}
                <div className="relative p-8 text-center text-white h-full flex flex-col justify-center">
                  {/* Icon */}
                  <motion.div
                    className="w-20 h-20 mx-auto mb-6 relative"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-full blur-lg opacity-50`}
                    />
                    <div className="relative w-full h-full bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                      <stat.icon className="w-10 h-10" />
                    </div>
                  </motion.div>

                  {/* Value */}
                  <motion.div
                    className="text-5xl md:text-6xl font-heading font-black mb-3"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{
                      delay: stat.delay + 0.3,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <CountUpAnimation value={stat.value} suffix={stat.suffix} />
                  </motion.div>

                  {/* Label */}
                  <h3 className="text-xl font-semibold mb-2">{stat.label}</h3>

                  {/* Description */}
                  <p className="text-white/80 text-sm">{stat.description}</p>

                  {/* Decorative Elements */}
                  <motion.div
                    className="absolute top-4 right-4 w-2 h-2 bg-white/40 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: stat.delay,
                    }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 w-1 h-1 bg-white/40 rounded-full"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: stat.delay + 1,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-white/90 text-lg mb-6">
            Join hundreds of satisfied patients who have transformed their lives
          </p>
          <motion.button
            className="px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-white/90 transition-colors btn-3d"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
