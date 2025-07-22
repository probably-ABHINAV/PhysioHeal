
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    age: 34,
    location: "Mumbai",
    condition: "Lower back pain",
    rating: 5,
    text: "Dr. helped me recover from chronic back pain that I had for 3 years. The treatment was professional and effective. Highly recommended!",
    initials: "PS"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    age: 45,
    location: "Delhi",
    condition: "Knee injury",
    rating: 5,
    text: "Excellent physiotherapy service. The personalized treatment plan helped me get back to my active lifestyle within 6 weeks.",
    initials: "RK"
  },
  {
    id: 3,
    name: "Anita Patel",
    age: 28,
    location: "Bangalore",
    condition: "Neck stiffness",
    rating: 5,
    text: "Professional service with modern techniques. The home visit option was very convenient during my recovery period.",
    initials: "AP"
  },
  {
    id: 4,
    name: "Vikram Singh",
    age: 52,
    location: "Pune",
    condition: "Shoulder pain",
    rating: 5,
    text: "Outstanding results! The therapy sessions were well-planned and the physiotherapist was very knowledgeable and caring.",
    initials: "VS"
  }
]

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            What Our Patients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from patients who have experienced remarkable recovery with our physiotherapy treatments
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-lg"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-lg"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Testimonials */}
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Card className="p-8 md:p-12 text-center shadow-xl border-0 bg-white dark:bg-gray-800">
                  <CardContent className="space-y-6">
                    <Quote className="w-12 h-12 text-primary mx-auto opacity-20" />
                    
                    {/* Rating */}
                    <div className="flex justify-center space-x-1">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic leading-relaxed">
                      "{testimonials[currentIndex].text}"
                    </blockquote>

                    {/* Patient Info */}
                    <div className="flex items-center justify-center space-x-4 pt-6">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-primary text-white text-lg font-semibold">
                          {testimonials[currentIndex].initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <div className="font-semibold text-lg text-gray-900 dark:text-white">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Age {testimonials[currentIndex].age} • {testimonials[currentIndex].location}
                        </div>
                        <div className="text-sm text-primary font-medium">
                          Treated for: {testimonials[currentIndex].condition}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                  setTimeout(() => setIsAutoPlaying(true), 10000)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
