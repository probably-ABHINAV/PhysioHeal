// lib/supabase-server.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type Database } from '@/types/supabase' // Make sure this type exists

export const createServerClient = () => {
  return createServerComponentClient<Database>({ cookies })
}
