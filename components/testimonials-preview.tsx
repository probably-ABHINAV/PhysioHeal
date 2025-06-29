"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getReviews, type Review } from "@/lib/supabase"

export function TestimonialsPreview() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = async () => {
    try {
      const approvedReviews = await getReviews(true) // Only get approved reviews
      setReviews(approvedReviews)
    } catch (error) {
      console.error('Error loading reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading testimonials...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            What Our <span className="gradient-text">Patients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real stories from real patients who have experienced our exceptional care
          </p>
        </motion.div>

        {reviews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">We're building our testimonials collection!</h3>
              <p className="text-muted-foreground mb-8">
                Check back soon to see what our patients say about their experience.
              </p>
              <Button 
                onClick={() => window.location.href = '/reviews'}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                Share Your Experience
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="relative">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col items-center text-center">
                    <Quote className="h-12 w-12 text-blue-600 mb-6" />

                    <div className="flex mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-6 h-6 ${
                            i < reviews[currentIndex].rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <blockquote className="text-lg md:text-xl text-muted-foreground mb-8 italic leading-relaxed">
                      "{reviews[currentIndex].comment}"
                    </blockquote>

                    <div className="flex flex-col items-center">
                      <h4 className="font-semibold text-lg">
                        {reviews[currentIndex].name || "Anonymous"}
                      </h4>
                      {reviews[currentIndex].service && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {reviews[currentIndex].service}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(reviews[currentIndex].created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {reviews.length > 1 && (
              <div className="flex justify-center mt-8 space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevReview}
                  className="bg-white/80 backdrop-blur-sm hover:bg-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center space-x-2">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextReview}
                  className="bg-white/80 backdrop-blur-sm hover:bg-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}