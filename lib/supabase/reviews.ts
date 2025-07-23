// lib/supabase/reviews.ts
import { supabase } from "../supabase"
import type { Tables } from "../supabase.types"

export type Review = Tables<"reviews">

export async function getReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching reviews:", error)
    return []
  }

  return data ?? []
}

export async function submitReview(review: {
  name: string
  rating: number
  service: string
  comment: string
}) {
  const { error } = await supabase.from("reviews").insert([review])

  if (error) {
    console.error("Error submitting review:", error)
    throw error
  }
}
