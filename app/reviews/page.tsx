import { useEffect, useState } from "react"
import { ReviewCard } from "@/components/review-card"
import { ReviewForm } from "@/components/review-form"
import { getReviews, submitReview } from "@/lib/supabase/reviews"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [newReview, setNewReview] = useState({
    name: "",
    email: "",
    rating: 0,
    comment: "",
    service: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    async function loadReviews() {
      const { data, error } = await getReviews()
      if (error) {
        toast.error("Failed to load reviews")
      } else {
        setReviews(data || [])
      }
    }
    loadReviews()
  }, [])

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const { error } = await submitReview(newReview)
    if (error) {
      toast.error("Failed to submit review")
    } else {
      toast.success("Review submitted successfully")
      setNewReview({ name: "", email: "", rating: 0, comment: "", service: "" })
      const { data } = await getReviews()
      setReviews(data || [])
    }
    setIsSubmitting(false)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Share Your Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <ReviewForm
            formData={newReview}
            setFormData={setNewReview}
            handleSubmit={handleSubmitReview}
            isSubmitting={isSubmitting}
          />
        </CardContent>
      </Card>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-center text-muted-foreground">No reviews yet.</p>
        ) : (
          reviews.map((review) => <ReviewCard key={review.id} review={review} />)
        )}
      </div>
    </div>
  )
}
