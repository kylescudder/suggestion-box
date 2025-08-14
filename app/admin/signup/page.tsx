import { createClient, isSupabaseConfigured } from "@/lib/supabase/server-auth"
import { redirect } from "next/navigation"
import { AdminSignUpForm } from "@/components/admin-signup-form"

export default async function AdminSignUpPage() {
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <h1 className="text-2xl font-bold mb-4 text-white">Connect Supabase to get started</h1>
      </div>
    )
  }

  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect("/admin")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center px-4 py-12">
      <AdminSignUpForm />
    </div>
  )
}
