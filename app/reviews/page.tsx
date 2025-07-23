import { useEffect, useState } from "react"
import { ReviewCard } from "@/components/review-card"
import { ReviewForm } from "@/components/review-form"
import { getReviews, submitReview } from "@/lib/supabase/reviews"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: "",
    email: "",
    service: ""
  })

  useEffect(() => {
    async function loadReviews() {
      const { data } = await getReviews()
      setReviews(data || [])
      setLoading(false)
    }
    loadReviews()
  }, [])

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const { error } = await submitReview(newReview)
    if (!error) {
      const { data } = await getReviews()
      setReviews(data || [])
      setNewReview({ name: "", rating: 0, comment: "", email: "", service: "" })
    }
    setIsSubmitting(false)
  }

  return (
    <Tabs defaultValue="reviews" className="max-w-3xl mx-auto py-12">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="reviews">Patient Reviews</TabsTrigger>
        <TabsTrigger value="submit">Submit Your Review</TabsTrigger>
      </TabsList>
      <TabsContent value="reviews">
        <div className="space-y-4 mt-4">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading reviews...</p>
          ) : reviews.length > 0 ? (
            reviews.map((review) => <ReviewCard key={review.id} review={review} />)
          ) : (
            <p className="text-center text-muted-foreground">No reviews yet.</p>
          )}
        </div>
      </TabsContent>
      <TabsContent value="submit">
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Leave a Review</CardTitle>
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
      </TabsContent>
    </Tabs>
  )
}
