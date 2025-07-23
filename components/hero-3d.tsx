"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ArrowRight, Award, Calendar, Phone, Star, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()

  const y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const x = useSpring(0, springConfig)
  const rotateX = useSpring(0, springConfig)
  const rotateY = useSpring(0, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || isMobile) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const mouseX = (e.clientX - centerX) / rect.width
      const mouseY = (e.clientY - centerY) / rect.height

      setMousePosition({ x: mouseX, y: mouseY })

      x.set(mouseX * 10)
      rotateX.set(mouseY * 5)
      rotateY.set(mouseX * 5)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener("mousemove", handleMouseMove, { passive: true })
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [x, rotateX, rotateY])

  // Reduced particles for mobile performance
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
  }>>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768)
    }

    checkMobile()
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
    }
  }, [])

  useEffect(() => {
    const particleCount = isMobile ? 20 : 50
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 2,
    }))
    setParticles(newParticles)
  }, [isMobile])

  return (
    <motion.section
      ref={containerRef}
      style={{ y, opacity, scale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 pt-16 sm:pt-20"
    >
      {/* Animated Particles Background - Hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden hidden sm:block">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary/20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [-10, 10, -10],
              x: [-5, 5, -5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + particle.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Morphing Background Shapes - Simplified on mobile */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-r from-primary/10 to-secondary/10 morphing-shape blur-2xl sm:blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: isMobile ? 15 : 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-l from-secondary/15 to-primary/15 morphing-shape blur-2xl sm:blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: isMobile ? 20 : 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            style={{ x, rotateX, rotateY }}
            className="text-center lg:text-left transform-gpu order-2 lg:order-1"
          >
            {/* Floating Badges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-6 sm:mb-8"
            >
              <Badge
                variant="secondary"
                className="px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium glass-effect hover:scale-105 transition-transform"
              >
                <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                5+ Years Experience
              </Badge>
              <Badge
                variant="outline"
                className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm glass-effect hover:scale-105 transition-transform"
              >
                BPT, MPT Ortho
              </Badge>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="hidden sm:block"
              >
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
              </motion.div>
            </motion.div>

            {/* Main Heading with Text Reveal */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-black leading-tight mb-6 sm:mb-8"
            >
              <motion.span
                className="block text-reveal gradient-text"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              >
                Healing
              </motion.span>
              <motion.span
                className="block text-foreground"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              >
                Through
              </motion.span>
              <motion.span
                className="block gradient-text"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
              >
                Innovation
              </motion.span>
            </motion.h1>

            {/* Enhanced Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl leading-relaxed"
            >
              Experience the future of physiotherapy with cutting-edge 3D movement analysis, personalized AI-driven
              treatment plans, and revolutionary recovery techniques.
            </motion.p>

            {/* Animated Rating */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start space-x-2 sm:space-x-3 mb-8 sm:mb-10"
            >
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.6 + i * 0.1, duration: 0.3 }}
                  >
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.1, duration: 0.5 }}
                className="text-sm sm:text-base lg:text-lg font-medium"
              >
                4.9/5 from 500+ patients
              </motion.span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="hidden sm:block"
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
              </motion.div>
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start mb-8 sm:mb-12"
            >
              <Button
                size="lg"
                className="group btn-3d pulse-glow-3d relative overflow-hidden min-h-[48px] text-sm sm:text-base"
                asChild
              >
                <Link href="/book-appointment" aria-label="Book appointment at PhysioHeal Clinic">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3" />
                  Book Appointment
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="btn-3d glass-effect min-h-[48px] text-sm sm:text-base"
                asChild
              >
                <Link href="tel:+917979855427" aria-label="Call PhysioHeal Clinic">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3" />
                  Call Now
                </Link>
              </Button>
            </motion.div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="grid grid-cols-3 gap-3 sm:gap-6 lg:max-w-md"
            >
              {[
                { value: "500+", label: "Patients Healed" },
                { value: "98%", label: "Success Rate" },
                { value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center glass-card p-3 sm:p-4 rounded-xl"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Advanced 3D Scene */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] xl:h-[700px]">
              {/* 3D Scene Container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 xl:w-[500px] xl:h-[500px]"
                  style={{
                    rotateX: useTransform(scrollYProgress, [0, 1], [0, 180]),
                    rotateY: useTransform(scrollYProgress, [0, 1], [0, 90]),
                  }}
                >
                  {/* Main 3D Sphere */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 blur-sm"
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />

                  {/* Central Medical Icon */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full bg-gradient-to-br from-white via-primary/10 to-white shadow-2xl flex items-center justify-center glass-card"
                    animate={{
                      y: [-10, 10, -10],
                      rotateX: [0, 5, 0],
                      rotateY: [0, -5, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.div
                      className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      🏥
                    </motion.div>
                  </motion.div>

                  {/* Orbiting Elements - Reduced on mobile */}
                  {[
                    {
                      emoji: "💪",
                      size: "w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20",
                      orbit: 120,
                      duration: 8,
                      color: "bg-primary",
                    },
                    {
                      emoji: "🦴",
                      size: "w-14 h-14 sm:w-18 sm:h-18 lg:w-24 lg:h-24",
                      orbit: 150,
                      duration: 12,
                      color: "bg-secondary",
                    },
                    {
                      emoji: "⚡",
                      size: "w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16",
                      orbit: 100,
                      duration: 6,
                      color: "bg-yellow-400",
                    },
                    {
                      emoji: "🎯",
                      size: "w-12 h-12 sm:w-14 sm:h-14 lg:w-18 lg:h-18",
                      orbit: 130,
                      duration: 10,
                      color: "bg-green-500",
                    },
                  ]
                    .slice(0, isMobile ? 3 : 4)
                    .map((element, index) => (
                      <motion.div
                        key={index}
                        className={`absolute ${element.size} ${element.color} rounded-full flex items-center justify-center shadow-lg glass-effect`}
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: element.duration,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        style={{
                          left: `${50 + (index % 2 === 0 ? 20 : -20)}%`,
                          top: `${50 + (index % 3 === 0 ? 15 : -15)}%`,
                        }}
                      >
                        <span className="text-white text-sm sm:text-base lg:text-xl xl:text-2xl">{element.emoji}</span>
                      </motion.div>
                    ))}

                  {/* Floating Particles - Hidden on mobile */}
                  {!isMobile &&
                    Array.from({ length: 15 }, (_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-primary/60 rounded-full"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [-5, 5, -5],
                          x: [-3, 3, -3],
                          opacity: [0.3, 1, 0.3],
                          scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 3 + Math.random() * 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}