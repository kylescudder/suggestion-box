'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Sparkles, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { submitSuggestion } from '@/lib/actions'
import { useFormStatus } from 'react-dom'
import { ConfettiCelebration } from '@/components/confetti-celebration'
import { MagicLoading } from '@/components/magic-loading'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      disabled={pending}
      className='w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg font-medium rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group magic-button magic-hover'
    >
      {pending ? (
        <>
          <div className='magic-spinner w-5 h-5 mr-2'></div>
          Sending your magic...
        </>
      ) : (
        <>
          <Send className='mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform animate-twinkle' />
          Send a Wish
        </>
      )}
    </Button>
  )
}

export function SuggestionForm() {
  const [result, setResult] = useState<{
    success?: string
    error?: string
  } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setResult(null)

    const response = await submitSuggestion(formData)
    setResult(response)
    setIsSubmitting(false)

    if (response.success) {
      // Show celebration animation
      setShowCelebration(true)
      // Reset form on success
      const form = document.getElementById('suggestion-form') as HTMLFormElement
      form?.reset()
    }
  }

  return (
    <>
      <Card className='bg-white/80 backdrop-blur-sm border-emerald-200 shadow-xl hover:shadow-2xl transition-all duration-500 magic-hover magic-particles animate-slide-in-magic'>
        <CardHeader className='text-center pb-6'>
          <CardTitle className='font-serif text-2xl text-slate-700 flex items-center justify-center gap-2'>
            <Sparkles className='w-6 h-6 text-emerald-500 animate-sparkle' />
            <span className='magic-text'>Your Magical Idea</span>
            <Sparkles className='w-6 h-6 text-emerald-500 animate-sparkle' />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {result?.success && (
            <div className='mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3 animate-bounce-gentle animate-pulse-glow'>
              <CheckCircle className='w-5 h-5 text-emerald-600 flex-shrink-0 animate-wiggle' />
              <p className='text-emerald-700 font-medium magic-text'>
                {result.success}
              </p>
            </div>
          )}

          {result?.error && (
            <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 animate-slide-in-magic'>
              <AlertCircle className='w-5 h-5 text-red-600 flex-shrink-0 animate-wiggle' />
              <p className='text-red-700'>{result.error}</p>
            </div>
          )}

          {isSubmitting && (
            <div className='mb-6'>
              <MagicLoading text='Sprinkling magic dust on your idea...' />
            </div>
          )}

          <form
            id='suggestion-form'
            action={handleSubmit}
            className='space-y-6'
          >
            <div className='space-y-2'>
              <Label htmlFor='title' className='text-slate-700 font-medium'>
                What's your brilliant idea? ✨
              </Label>
              <Input
                id='title'
                name='title'
                placeholder='A magical solution to...'
                required
                className='border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400 rounded-lg py-3 transition-all duration-300 hover:border-emerald-300 magic-hover animate-rainbow-border'
              />
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='description'
                className='text-slate-700 font-medium'
              >
                Tell us more about your magic
              </Label>
              <Textarea
                id='description'
                name='description'
                placeholder='Describe your idea in detail... Let your imagination sparkle!'
                required
                rows={4}
                className='border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400 rounded-lg transition-all duration-300 hover:border-emerald-300 resize-none magic-hover'
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label
                  htmlFor='author_name'
                  className='text-slate-700 font-medium'
                >
                  Your name (optional)
                </Label>
                <Input
                  id='author_name'
                  name='author_name'
                  placeholder='Magic maker'
                  className='border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400 rounded-lg transition-all duration-300 hover:border-emerald-300 magic-hover'
                />
              </div>

              <div className='space-y-2'>
                <Label
                  htmlFor='author_email'
                  className='text-slate-700 font-medium'
                >
                  Your email (optional)
                </Label>
                <Input
                  id='author_email'
                  name='author_email'
                  type='email'
                  placeholder='sparkle@magic.com'
                  className='border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400 rounded-lg transition-all duration-300 hover:border-emerald-300 magic-hover'
                />
              </div>
            </div>

            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      <ConfettiCelebration
        show={showCelebration}
        onComplete={() => setShowCelebration(false)}
      />
    </>
  )
}
