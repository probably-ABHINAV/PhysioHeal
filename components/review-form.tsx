// components/review-form.tsx
"use client"

import { useState } from "react"
import { submitReview } from "@/lib/supabase/reviews"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export function ReviewForm({ onSubmit }: { onSubmit: () => void }) {
  const [form, setForm] = useState({
    name: "",
    rating: 5,
    service: "",
    comment: ""
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await submitReview({ ...form, rating: Number(form.rating) })
      setForm({ name: "", rating: 5, service: "", comment: "" })
      onSubmit()
    } catch (error) {
      alert("Error submitting review")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div>
        <Label>Service</Label>
        <Input name="service" value={form.service} onChange={handleChange} required />
      </div>
      <div>
        <Label>Rating</Label>
        <Input
          name="rating"
          type="number"
          min="1"
          max="5"
          value={form.rating}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Comment</Label>
        <Textarea name="comment" value={form.comment} onChange={handleChange} required />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  )
}
