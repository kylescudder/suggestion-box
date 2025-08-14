"use server"

import { supabase } from "@/lib/supabase/client"
import { revalidatePath } from "next/cache"

export async function updateSuggestionStatus(suggestionId: string, status: string) {
  try {
    const { error } = await supabase
      .from("suggestions")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", suggestionId)

    if (error) {
      console.error("Error updating suggestion status:", error)
      return { error: "Failed to update suggestion status" }
    }

    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("Update error:", error)
    return { error: "An unexpected error occurred" }
  }
}
