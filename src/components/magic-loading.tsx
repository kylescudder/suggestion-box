'use client'

import { Sparkles } from 'lucide-react'

interface MagicLoadingProps {
  text?: string
}

export function MagicLoading({ text = 'Working magic...' }: MagicLoadingProps) {
  return (
    <div className='flex flex-col items-center justify-center gap-4 p-8'>
      <div className='relative'>
        <div className='magic-spinner'></div>
        <Sparkles className='absolute inset-0 m-auto w-6 h-6 text-emerald-600 animate-sparkle' />
      </div>
      <p className='text-emerald-700 font-medium animate-pulse'>{text}</p>
    </div>
  )
}
