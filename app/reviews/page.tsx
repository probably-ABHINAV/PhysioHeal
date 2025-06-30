import { Metadata } from "next"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Quote, Calendar, User } from "lucide-react"
import { ReviewForm } from "@/components/review-form"

export const metadata: Metadata = {
  title: "Patient Reviews | PhysioHeal Clinic - Real Patient Experiences",
  description: "Read genuine patient reviews and testimonials about PhysioHeal Clinic's physiotherapy services and treatment outcomes.",
}

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "2024-01-15",
    treatment: "Sports Physiotherapy",
    review: "Excellent care and professional service. Dr. Smith helped me recover from my knee injury much faster than expected. Highly recommend!",
    verified: true
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    date: "2024-01-10",
    treatment: "Manual Therapy",
    review: "Outstanding treatment for my back pain. The staff is knowledgeable and caring. The clinic has a great atmosphere and modern equipment.",
    verified: true
  },
  {
    id: 3,
    name: "Emily Davis",
    rating: 4,
    date: "2024-01-08",
    treatment: "Post-Surgery Rehabilitation",
    review: "Very satisfied with my rehabilitation program. The therapists are skilled and supportive throughout the recovery process.",
    verified: true
  },
  {
    id: 4,
    name: "David Wilson",
    rating: 5,
    date: "2024-01-05",
    treatment: "Exercise Therapy",
    review: "Great experience! The personalized exercise program really helped improve my mobility. Professional and friendly staff.",
    verified: true
  }
]

const stats = {
  totalReviews: 156,
  averageRating: 4.8,
  fiveStarPercentage: 85,
  recommendationRate: 96
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3 w-3 md:h-4 md:w-4 ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  )
}

export default function ReviewsPage() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container-mobile py-8 md:py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 md:mb-6">
            Patient <span className="gradient-text">Reviews</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real experiences from our patients who have achieved their recovery goals with our expert physiotherapy care.
          </p>
        </motion.div>

        {/* Review Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16"
        >
          {Object.entries({
            'Total Reviews': stats.totalReviews,
            'Average Rating': stats.averageRating,
            '5-Star Reviews': `${stats.fiveStarPercentage}%`,
            'Would Recommend': `${stats.recommendationRate}%`
          }).map(([label, value], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <Card className="glass-card card-3d text-center">
                <CardContent className="p-4 md:p-6">
                  <div className="text-2xl md:text-3xl font-heading font-bold text-primary mb-2">{value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">{label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Reviews List */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 space-y-4 md:space-y-6"
          >
            <h2 className="text-xl md:text-2xl font-heading font-bold mb-4 md:mb-6">Patient Testimonials</h2>
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <Card className="glass-card card-3d">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm md:text-base font-heading">{review.name}</div>
                          <div className="text-xs md:text-sm text-muted-foreground">{review.treatment}</div>
                        </div>
                      </div>
                      {review.verified && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <StarRating rating={review.rating} />
                      <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                        {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="relative">
                      <Quote className="absolute -top-1 -left-1 md:-top-2 md:-left-2 h-4 w-4 md:h-6 md:w-6 text-primary/20" />
                      <p className="text-muted-foreground leading-relaxed pl-3 md:pl-4 text-sm md:text-base">
                        {review.review}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            <div className="text-center">
              <Button variant="outline" className="btn-3d">Load More Reviews</Button>
            </div>
          </motion.div>

          {/* Review Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="glass-card card-3d sticky top-24">
              <CardHeader>
                <CardTitle className="font-heading text-lg md:text-xl">Share Your Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <ReviewForm />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}