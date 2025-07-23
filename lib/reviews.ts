"use client"

import { useEffect, useState } from "react"
import { ReviewCard } from "@/components/review-card"
import { ReviewForm } from "@/components/review-form"
import { getReviews, submitReview } from "@/lib/supabase/reviews"
import type { Review } from "@/lib/supabase/reviews"

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    comment: "",
    service: ""
  })

  useEffect(() => {
    async function fetchReviews() {
      const data = await getReviews()
      setReviews(data || [])
    }
    fetchReviews()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const newReview = await submitReview(formData)
    if (newReview) {
      setReviews([newReview, ...reviews])
      setFormData({ name: "", email: "", rating: 0, comment: "", service: "" })
    }
    setIsSubmitting(false)
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Share Your Experience</h1>
      <ReviewForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
      <div className="mt-10 space-y-6">
        {reviews.length === 0 ? (
          <p className="text-muted-foreground">No reviews yet. Be the first to share!</p>
        ) : (
          reviews.map((review) => <ReviewCard key={review.id} review={review} />)
        )}
      </div>
    </div>
  )
}
