// components/review-card.tsx
import { Star } from "lucide-react"
import { Review } from "@/lib/supabase/reviews"

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-xl border border-neutral-800 p-4 bg-background/80 backdrop-blur-md shadow-lg space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{review.name}</h3>
        <div className="flex gap-1">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
          ))}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{review.service}</p>
      <p className="text-sm">{review.comment}</p>
    </div>
  )
}
