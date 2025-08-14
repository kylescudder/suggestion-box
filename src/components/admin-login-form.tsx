'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Loader2, Shield, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { signIn } from '@/lib/auth-actions'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      disabled={pending}
      className='w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg font-medium rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer'
    >
      {pending ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Signing in...
        </>
      ) : (
        <>
          <Shield className='mr-2 h-5 w-5' />
          Enter Admin Portal
        </>
      )}
    </Button>
  )
}

export function AdminLoginForm() {
  const router = useRouter()
  const [state, formAction] = useActionState(signIn, null)

  useEffect(() => {
    if (state?.success) {
      router.push('/admin')
    }
  }, [state, router])

  return (
    <div className='w-full max-w-md'>
      <Card className='bg-white/10 backdrop-blur-md border-emerald-300/30 shadow-2xl'>
        <CardHeader className='text-center pb-6'>
          <CardTitle className='font-serif text-3xl text-white flex items-center justify-center gap-2'>
            <Sparkles className='w-7 h-7 text-emerald-400 animate-sparkle' />
            Admin Portal
            <Sparkles className='w-7 h-7 text-emerald-400 animate-sparkle' />
          </CardTitle>
          <p className='text-emerald-200 mt-2'>
            Access the magical suggestion dashboard
          </p>
        </CardHeader>

        <CardContent>
          <form action={formAction} className='space-y-6'>
            {state?.error && (
              <div className='bg-red-500/20 border border-red-400/50 text-red-200 px-4 py-3 rounded-lg'>
                {state.error}
              </div>
            )}

            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email' className='text-emerald-100 font-medium'>
                  Admin Email
                </Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='admin@magic.com'
                  required
                  className='bg-white/10 border-emerald-300/30 text-white placeholder:text-emerald-200/60 focus:border-emerald-400 focus:ring-emerald-400'
                />
              </div>
              <div className='space-y-2'>
                <Label
                  htmlFor='password'
                  className='text-emerald-100 font-medium'
                >
                  Password
                </Label>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  required
                  className='bg-white/10 border-emerald-300/30 text-white focus:border-emerald-400 focus:ring-emerald-400'
                />
              </div>
            </div>

            <SubmitButton />

            <div className='text-center text-emerald-200/80 text-sm'>
              Admin accounts are provisioned via Supabase. Contact your
              administrator if you need access.
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
