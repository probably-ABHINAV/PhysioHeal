import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey ? createSupabaseClient(supabaseUrl, supabaseAnonKey) : null

// Database Types
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
          user_id: string | null
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
          user_id?: string | null
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
          user_id?: string | null
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
          user_id: string | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          message: string
          status?: 'pending' | 'read'
          created_at?: string
          user_id?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          message?: string
          status?: 'pending' | 'read'
          created_at?: string
          user_id?: string | null
        }
      }
      reviews: {
        Row: {
          id: string
          name: string
          email: string | null
          rating: number
          comment: string
          service: string | null
          approved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email?: string | null
          rating: number
          comment: string
          service?: string | null
          approved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string | null
          rating?: number
          comment?: string
          service?: string | null
          approved?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      diagnostic_logs: {
        Row: {
          id: string
          test_name: string
          run_status: 'pass' | 'fail' | 'warning'
          logs: any
          timestamp: string
          user_id: string | null
        }
        Insert: {
          id?: string
          test_name: string
          run_status: 'pass' | 'fail' | 'warning'
          logs?: any
          timestamp?: string
          user_id?: string | null
        }
        Update: {
          id?: string
          test_name?: string
          run_status?: 'pass' | 'fail' | 'warning'
          logs?: any
          timestamp?: string
          user_id?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          role: 'admin' | 'doctor' | 'patient'
          full_name: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role?: 'admin' | 'doctor' | 'patient'
          full_name?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'admin' | 'doctor' | 'patient'
          full_name?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Enhanced Client Creation
export const createClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }
  return createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey)
}

// Appointments Management
export async function getAppointments(userId?: string): Promise<Database['public']['Tables']['appointments']['Row'][]> {
  if (!supabase) return []

  let query = supabase.from('appointments').select('*').order('created_at', { ascending: false })

  if (userId) {
    query = query.eq('user_id', userId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching appointments:', error)
    return []
  }

  return data || []
}

export async function addAppointment(appointment: Database['public']['Tables']['appointments']['Insert']): Promise<Database['public']['Tables']['appointments']['Row'] | null> {
  if (!supabase) {
    console.warn("Supabase not configured – returning mock appointment.")
    return {
      id: `mock-${Date.now()}`,
      ...appointment,
      created_at: new Date().toISOString(),
      status: 'pending'
    } as Database['public']['Tables']['appointments']['Row']
  }

  const { data, error } = await supabase.from('appointments').insert([appointment]).select().single()

  if (error) {
    console.error('Error adding appointment:', error)
    return null
  }

  return data
}

export async function updateAppointmentStatus(id: string, status: 'pending' | 'seen'): Promise<boolean> {
  if (!supabase) return false

  const { error } = await supabase
    .from('appointments')
    .update({ status })
    .eq('id', id)

  return !error
}

// Messages Management
export async function getMessages(userId?: string): Promise<Database['public']['Tables']['messages']['Row'][]> {
  if (!supabase) return []

  let query = supabase.from('messages').select('*').order('created_at', { ascending: false })

  if (userId) {
    query = query.eq('user_id', userId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching messages:', error)
    return []
  }

  return data || []
}

export async function addMessage(message: Database['public']['Tables']['messages']['Insert']): Promise<Database['public']['Tables']['messages']['Row'] | null> {
  if (!supabase) {
    console.warn("Supabase not configured – returning mock message.")
    return {
      id: `mock-${Date.now()}`,
      ...message,
      created_at: new Date().toISOString(),
      status: 'pending'
    } as Database['public']['Tables']['messages']['Row']
  }

  const { data, error } = await supabase.from('messages').insert([message]).select().single()

  if (error) {
    console.error('Error adding message:', error)
    return null
  }

  return data
}

export async function updateMessageStatus(id: string, status: 'pending' | 'read'): Promise<boolean> {
  if (!supabase) return false

  const { error } = await supabase
    .from('messages')
    .update({ status })
    .eq('id', id)

  return !error
}

// Reviews Management
export interface Review {
  id: string
  name: string | null
  rating: number
  comment: string
  service: string | null
  email: string | null
  created_at: string
  updated_at: string
  approved: boolean
}

export async function getReviews(approved: boolean = true): Promise<Review[]> {
  if (!supabase) {
    return [
      {
        id: "demo",
        name: "Demo Patient",
        rating: 5,
        comment: "Supabase isn't configured yet. Showing demo review.",
        service: "General Consultation",
        email: "demo@example.com",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        approved: true
      },
    ]
  }

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq('approved', approved)
    .order("created_at", { ascending: false })

  if (error) {
    if ((error as any).code === "42P01" || /does not exist/i.test(error.message)) {
      console.warn('Supabase: "reviews" table is missing – returning empty list.')
      return []
    }
    console.error("Error fetching reviews:", error)
    return []
  }

  return data || []
}

export async function addReview(review: Omit<Review, "id" | "created_at">): Promise<Review | null> {
  if (!supabase) {
    console.warn("Supabase not configured – returning mock review.")
    return {
      id: `mock-${Date.now()}`,
      ...review,
      created_at: new Date().toISOString(),
    }
  }

  const { data, error } = await supabase.from("reviews").insert([{
    ...review,
    approved: false // Reviews need approval by default
  }]).select().single()

  if (error) {
    console.warn(`Supabase insert failed. Falling back to local mock. – ${error.message}`)
    return {
      id: `temp-${Date.now()}`,
      ...review,
      created_at: new Date().toISOString(),
    }
  }

  // Trigger AI moderation for the new review
  if (data && typeof window !== 'undefined') {
    try {
      await fetch('/api/moderate-review', {
        method: 'POST',
        body: JSON.stringify({ 
          id: data.id, 
          review_text: review.comment 
        }),
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (moderationError) {
      console.error('AI moderation failed:', moderationError)
      // Don't fail the review submission if moderation fails
    }
  }

  return data
}

export async function approveReview(id: string): Promise<boolean> {
  if (!supabase) return false

  const { error } = await supabase
    .from('reviews')
    .update({ approved: true })
    .eq('id', id)

  return !error
}

// User Profile Management
export async function createUserProfile(user: {
  id: string
  email: string
  role?: 'admin' | 'doctor' | 'patient'
  full_name?: string
  phone?: string
}): Promise<Database['public']['Tables']['profiles']['Row'] | null> {
  if (!supabase) return null

  // In production, profiles are created automatically via trigger
  // This function is mainly for manual profile creation or updates
  const { data, error } = await supabase
    .from('profiles')
    .upsert([{
      id: user.id,
      email: user.email,
      role: user.role || 'patient',
      full_name: user.full_name || null,
      phone: user.phone || null
    }])
    .select()
    .single()

  if (error) {
    console.error('Error creating user profile:', error)
    return null
  }

  return data
}

export async function getUserProfile(userId: string): Promise<Database['public']['Tables']['profiles']['Row'] | null> {
  if (!supabase) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }

  return data
}

// Diagnostic Logs
export async function logDiagnostic(log: {
  test_name: string
  run_status: 'pass' | 'fail' | 'warning'
  logs: any
  user_id?: string
}): Promise<boolean> {
  if (!supabase) return false

  const { error } = await supabase
    .from('diagnostic_logs')
    .insert([log])

  if (error) {
    console.error('Error logging diagnostic:', error)
    return false
  }

  return true
}

export async function getDiagnosticLogs(limit: number = 50): Promise<Database['public']['Tables']['diagnostic_logs']['Row'][]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('diagnostic_logs')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching diagnostic logs:', error)
    return []
  }

  return data || []
}

// Authentication helpers
export async function signInWithEmail(email: string, password: string) {
  if (!supabase) throw new Error('Supabase not configured')

  return await supabase.auth.signInWithPassword({ email, password })
}

export function isAuthorizedAdmin(email?: string): boolean {
  const authorizedEmails = ['xoxogroovy@gmail.com']
  return email ? authorizedEmails.includes(email.toLowerCase()) : false
}

export async function signUpWithEmail(email: string, password: string, metadata?: any) {
  if (!supabase) throw new Error('Supabase not configured')

  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  })
}

export async function signOut() {
  if (!supabase) return

  return await supabase.auth.signOut()
}

export async function getCurrentUser() {
  if (!supabase) return null

  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getCurrentSession() {
  if (!supabase) return null

  const { data: { session } } = await supabase.auth.getSession()
  return session
}

// Admin Dashboard Stats
export async function getAdminStats() {
  if (!supabase) return null

  const { data, error } = await supabase
    .from('admin_stats')
    .select('*')
    .single()

  if (error) {
    console.error('Error fetching admin stats:', error)
    return null
  }

  return data
}

// Enhanced admin check that works with actual auth
export async function isCurrentUserAdmin(): Promise<boolean> {
  if (!supabase) return false

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  const profile = await getUserProfile(user.id)
  return profile?.role === 'admin'
}