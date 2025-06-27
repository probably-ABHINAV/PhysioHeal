
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Star, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase"

const reviewSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  rating: z.number().min(1, "Please select a rating").max(5),
  comment: z.string().min(10, "Review must be at least 10 characters"),
  service: z.string().optional(),
})

type ReviewFormData = z.infer<typeof reviewSchema>

export function ReviewForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)
  const { toast } = useToast()
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
  })

  const selectedService = watch("service")

  const onSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true)
    
    try {
      // Check if Supabase is configured
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error('Supabase configuration missing')
      }

      const reviewData = {
        name: data.name,
        email: data.email || null,
        rating: data.rating,
        comment: data.comment,
        approved: false
      }

      const { data: insertedData, error } = await supabase
        .from('reviews')
        .insert(reviewData)
        .select()

      if (error) {
        console.error('Supabase error:', error)
        throw new Error(`Database error: ${error.message}`)
      }

      if (!insertedData || insertedData.length === 0) {
        throw new Error('No data returned from database')
      }

      setIsSuccess(true)
      reset()
      setSelectedRating(0)
      
      toast({
        title: "Review Submitted!",
        description: "Thank you for your feedback. Your review will be published after approval.",
      })

    } catch (error: any) {
      console.error('Error submitting review:', error)
      
      let errorMessage = "There was an error submitting your review. Please try again."
      
      if (error.message?.includes('configuration missing')) {
        errorMessage = "Database configuration error. Please contact support."
      } else if (error.message?.includes('Database error')) {
        errorMessage = `Database error: ${error.message.replace('Database error: ', '')}`
      }
      
      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating)
    setValue("rating", rating)
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 bg-green-50 rounded-2xl border border-green-200"
      >
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-800 mb-2">Review Submitted!</h3>
        <p className="text-green-600 mb-4">Thank you for your feedback. Your review will be published after approval.</p>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Your Name</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Enter your name"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email (Optional)</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="Enter your email (optional)"
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Rating</Label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 cursor-pointer transition-colors ${
                star <= selectedRating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
              onClick={() => handleRatingClick(star)}
            />
          ))}
        </div>
        {errors.rating && (
          <p className="text-sm text-red-500">{errors.rating.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="service">Service (Optional)</Label>
        <Select onValueChange={(value) => setValue("service", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="physiotherapy">Physiotherapy</SelectItem>
            <SelectItem value="sports-injury">Sports Injury Recovery</SelectItem>
            <SelectItem value="pain-management">Pain Management</SelectItem>
            <SelectItem value="orthopedic">Orthopedic Care</SelectItem>
            <SelectItem value="rehabilitation">Rehabilitation Therapy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Your Review</Label>
        <Textarea
          id="comment"
          {...register("comment")}
          placeholder="Share your experience..."
          rows={4}
          className={errors.comment ? "border-red-500" : ""}
        />
        {errors.comment && (
          <p className="text-sm text-red-500">{errors.comment.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
        size="lg"
      >
        {isSubmitting ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
          />
        ) : (
          "Submit Review"
        )}
      </Button>
    </motion.form>
  )
}
