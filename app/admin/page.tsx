import { createClient, isSupabaseConfigured } from "@/lib/supabase/server-auth"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin-dashboard"
import { signOut } from "@/lib/auth-actions"
import { Button } from "@/components/ui/button"
import { LogOut, Sparkles } from "lucide-react"

export default async function AdminPage() {
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <h1 className="text-2xl font-bold mb-4 text-white">Connect Supabase to get started</h1>
      </div>
    )
  }

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  // Fetch suggestions
  const { data: suggestions, error } = await supabase
    .from("suggestions")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching suggestions:", error)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-green-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-emerald-600 animate-sparkle" />
              <div>
                <h1 className="font-serif text-2xl font-bold text-slate-800">Magic Dashboard</h1>
                <p className="text-slate-600 text-sm">Welcome back, {user.email}</p>
              </div>
            </div>
            <form action={signOut}>
              <Button
                type="submit"
                variant="outline"
                className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 transition-all duration-300 bg-transparent cursor-pointer"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminDashboard suggestions={suggestions || []} />
      </main>
    </div>
  )
}
