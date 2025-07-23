// app/reviews/page.tsx
import { ReviewCard } from "@/components/review-card"
import { ReviewForm } from "@/components/review-form"
import { getReviews } from "@/lib/supabase/reviews"
import { Suspense } from "react"

async function ReviewList() {
  const reviews = await getReviews()

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground">No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))
      )}
    </div>
  )
}

export default function ReviewsPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-2">Share Your Experience 💬</h1>
        <p className="text-muted-foreground">
          We care about your feedback. Leave a review below.
        </p>
        <ReviewForm onSubmit={() => window.location.reload()} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Reviews ⭐</h2>
        <Suspense fallback={<p>Loading reviews...</p>}>
          <ReviewList />
        </Suspense>
      </section>
    </main>
  )
}
