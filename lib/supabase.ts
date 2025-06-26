
import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/** Only create the client if the required env vars exist. */
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey ? createSupabaseClient(supabaseUrl, supabaseAnonKey) : null

export interface Review {
  id: string
  name: string | null
  rating: number
  comment: string
  service: string | null
  created_at: string
}

export async function getReviews(): Promise<Review[]> {
  if (!supabase) {
    // env vars missing – return demo data
    return [
      {
        id: "demo",
        name: "Demo Patient",
        rating: 5,
        comment: "Supabase isn't configured yet. Showing demo review.",
        service: "Pain Management",
        created_at: new Date().toISOString(),
      },
    ]
  }

  const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false })

  // --- graceful fallback if the table is missing ---
  if (error) {
    // Postgres error code 42P01 = "relation does not exist"
    if ((error as any).code === "42P01" || /does not exist/i.test(error.message)) {
      console.warn(
        'Supabase: "reviews" table is missing – returning empty list. ' +
          "Run scripts/create-reviews-table.sql to create it.",
      )
      return []
    }

    console.error("Error fetching reviews:", error)
    return []
  }

  return data || []
}

export async function addReview(review: Omit<Review, "id" | "created_at">): Promise<Review | null> {
  // 1 ▸  No Supabase configured ───► return demo row
  if (!supabase) {
    console.warn("Supabase not configured – returning mock review.")
    return {
      id: `mock-${Date.now()}`,
      ...review,
      created_at: new Date().toISOString(),
    }
  }

  // 2 ▸  Attempt real insert
  const { data, error } = await supabase.from("reviews").insert([review]).select().single()

  // 3 ▸  Graceful fallback if insert fails
  if (error) {
    // 42P01 ⇒ table missing, 42501 ⇒ RLS / permission denied
    const missing = (error as any).code === "42P01" || /does not exist/i.test(error.message)
    const rls = (error as any).code === "42501" || /permission/i.test(error.message)

    console.warn(
      `Supabase insert failed (${missing ? "missing table" : rls ? "RLS" : "unknown"}). \
Falling back to local mock. – ${error.message}`,
    )

    return {
      id: `temp-${Date.now()}`,
      ...review,
      created_at: new Date().toISOString(),
    }
  }

  return data
}

// Client-side Supabase client for auth and real-time features
export const createClient = () => {
  return createClientComponentClient()
}

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          id: string
          name: string
          phone: string
          email: string | null
          reason: string
          preferred_time: string
          created_at: string
          status: 'pending' | 'seen'
        }
        Insert: {
          id?: string
          name: string
          phone: string
          email?: string | null
          reason: string
          preferred_time: string
          created_at?: string
          status?: 'pending' | 'seen'
        }
        Update: {
          id?: string
          name?: string
          phone?: string
          email?: string | null
          reason?: string
          preferred_time?: string
          created_at?: string
          status?: 'pending' | 'seen'
        }
      }
      messages: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          message: string
          status: 'pending' | 'read'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          message: string
          status?: 'pending' | 'read'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          message?: string
          status?: 'pending' | 'read'
          created_at?: string
        }
      }
    }
  }
}
