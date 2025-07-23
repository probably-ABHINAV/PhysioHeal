import { Star, User, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Review } from "@/lib/supabase/reviews"

interface Props {
  review: Review
}

export function ReviewCard({ review }: Props) {
  return (
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
                        className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
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
  )
}
