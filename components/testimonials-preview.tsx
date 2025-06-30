"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getReviews, type Review } from "@/lib/supabase"

export function TestimonialsPreview() {
  const [testimonials, setTestimonials] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadApprovedReviews() {
      try {
        const reviews = await getReviews()
        // Filter only approved reviews and take the first 3 for preview
        const approvedReviews = reviews?.filter(review => review.approved).slice(0, 3) || []
        setTestimonials(approvedReviews)
      } catch (error) {
        console.error('Error loading reviews:', error)
        setTestimonials([])
      } finally {
        setLoading(false)
      }
    }
    loadApprovedReviews()
  }, [])

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            What Our <span className="gradient-text">Patients Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from real patients who have experienced our exceptional care
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="flex items-center justify-center min-h-[200px]">
          {loading ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading testimonials...</p>
            </motion.div>
          ) : testimonials.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-muted-foreground text-lg mb-4">
                We're building our testimonials collection!
              </p>
              <p className="text-sm text-muted-foreground">
                Check back soon to see what our patients say about their experience.
              </p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 w-full">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Quote className="w-8 h-8 text-primary/30 mr-2" />
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6 italic">"{testimonial.comment}"</p>
                      <div className="flex items-center">
                        <Avatar className="w-12 h-12 mr-4">
                          <AvatarImage src="/placeholder.svg" alt={testimonial.name || "Anonymous"} />
                          <AvatarFallback>
                            {(testimonial.name || "Anonymous")
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{testimonial.name || "Anonymous"}</div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.service || "Patient"}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}