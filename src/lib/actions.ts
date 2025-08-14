'use server'

import { supabase } from '@/lib/supabase/client'
import { revalidatePath } from 'next/cache'

export async function submitSuggestion(formData: FormData) {
  try {
    const title = formData.get('title')?.toString()
    const description = formData.get('description')?.toString()
    const author_name = formData.get('author_name')?.toString() || null
    const author_email = formData.get('author_email')?.toString() || null

    if (!title || !description) {
      return { error: 'Title and description are required' }
    }

    const { error } = await supabase.from('suggestions').insert([
      {
        title,
        description,
        author_name,
        author_email,
        status: 'pending'
      }
    ])

    if (error) {
      console.error('Supabase error:', error)
      return { error: 'Failed to submit suggestion. Please try again.' }
    }

    revalidatePath('/admin')
    return {
      success: 'Your idea is now part of our magic! Thank you for sharing! 🎉'
    }
  } catch (error) {
    console.error('Submission error:', error)
    return { error: 'Something magical went wrong. Please try again.' }
  }
}
