"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, User, Calendar, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { getReviews, addReview, type Review } from "@/lib/supabase"
import { ReviewForm } from "@/components/review-form"

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    review_text: "",
    email: "",
    service: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Load reviews from Supabase on component mount
  useEffect(() => {
    async function loadReviews() {
      setLoading(true)
      try {
        const reviewsData = await getReviews()
        setReviews(reviewsData || [])
      } catch (error) {
        console.error('Error loading reviews:', error)
        setReviews([])
        toast({
          title: "Loading Error",
          description: "Could not load reviews. Please refresh the page.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    loadReviews()
  }, [])

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const reviewData = {
  name: newReview.name,
  rating: newReview.rating,
  comment: newReview.review_text,
  service: newReview.service || null,
  approved: false,
  email: '',
  updated_at: new Date().toISOString()
}



    const addedReview = await addReview(reviewData)

    if (addedReview) {
      setReviews([addedReview, ...reviews])
      setNewReview({ name: "", rating: 5, review_text: "", email: "", service: "" })
      setShowForm(false)

      toast({
        title: "Review Submitted!",
        description: "Thank you for your feedback. Your review has been added.",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      })
    }

    setIsSubmitting(false)
  }

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Patient <span className="gradient-text">Reviews</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              See what our patients say about their experience with us
            </p>

            {/* Overall Rating */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{averageRating.toFixed(1)}</div>
                <div className="flex items-center justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">Based on {reviews.length} reviews</div>
              </div>
            </div>

            <Button onClick={() => setShowForm(!showForm)} className="mb-8">
              <Plus className="w-4 h-4 mr-2" />
              Write a Review
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Review Form */}
      {showForm && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="py-8 bg-muted/30"
        >
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader>
                <CardTitle>Share Your Experience</CardTitle>
                <CardDescription>Help others by sharing your experience with our services</CardDescription>
              </CardHeader>
              <CardContent>
                <ReviewForm />
              </CardContent>
            </Card>
          </div>
        </motion.section>
      )}

      {/* Reviews List */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={review.name || "Anonymous"} />
                          <AvatarFallback>
                            <User className="w-6 h-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">{review.name || "Anonymous"}</h4>
                              <div className="flex items-center space-x-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                {review.service && (
                                  <Badge variant="secondary" className="text-xs">
                                    {review.service}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(review.created_at).toLocaleDateString()}
                            </div>
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}