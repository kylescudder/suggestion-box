import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Check if Supabase environment variables are available
export const isSupabaseConfigured =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
  typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0

// Create a singleton instance of the Supabase client for Client Components
export const supabase = createClientComponentClient()

export type Suggestion = {
  id: string
  title: string
  description: string
  author_name?: string
  author_email?: string
  status: "pending" | "reviewed" | "implemented" | "rejected"
  created_at: string
  updated_at: string
}
