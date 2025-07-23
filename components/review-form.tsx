import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"

interface ReviewFormProps {
  formData: {
    name: string
    email: string
    rating: number
    comment: string
    service: string
  }
  setFormData: (data: any) => void
  handleSubmit: (e: React.FormEvent) => void
  isSubmitting: boolean
}

export function ReviewForm({ formData, setFormData, handleSubmit, isSubmitting }: ReviewFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleRating = (rating: number) => {
    setFormData({ ...formData, rating })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            onClick={() => handleRating(i + 1)}
            className={`w-6 h-6 cursor-pointer ${i < formData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
      <div>
        <Label>Name</Label>
        <Input name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <Label>Email</Label>
        <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <Label>Service</Label>
        <Input name="service" value={formData.service} onChange={handleChange} />
      </div>
      <div>
        <Label>Comment</Label>
        <Textarea name="comment" value={formData.comment} onChange={handleChange} required />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  )
}
