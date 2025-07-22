"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ReviewCard } from "@/components/review-card"
import { ReviewForm } from "@/components/review-form"
import { getAllReviews } from "@/lib/supabase/reviews"

export default function ReviewsPage() {
  const [showForm, setShowForm] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    const fetchReviews = async () => {
      const allReviews = await getAllReviews()
      if (allReviews) setReviews(allReviews)
    }

    fetchReviews()
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Patient Reviews</h1>

      <div className="flex justify-center mb-6">
        <Button variant="outline" onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? "Cancel" : "Leave a Review"}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Write your review ✍️</CardTitle>
          </CardHeader>
          <CardContent>
            <ReviewForm />
          </CardContent>
        </Card>
      )}

      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No reviews yet. Be the first to leave one!</p>
      )}
    </div>
  )
}
