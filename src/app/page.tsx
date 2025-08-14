import { SuggestionForm } from '@/components/suggestion-form'
import { Sparkles, Heart, Star, Shield } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden magic-particles'>
      <div className='absolute top-6 right-6 z-20'>
        <Link
          href='/admin/login'
          className='group flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-emerald-200/50 rounded-full text-slate-600 hover:text-emerald-700 hover:bg-white/30 hover:border-emerald-300/70 transition-all duration-300 hover:scale-105 animate-float text-sm font-medium'
          style={{ animationDelay: '0.8s' }}
        >
          <Shield className='w-4 h-4 group-hover:animate-sparkle' />
          Admin
        </Link>
      </div>

      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-20 left-10 animate-float'>
          <Sparkles className='w-8 h-8 text-emerald-300 animate-sparkle' />
        </div>
        <div
          className='absolute top-40 right-20 animate-float'
          style={{ animationDelay: '1s' }}
        >
          <Star className='w-6 h-6 text-green-400 animate-twinkle' />
        </div>
        <div
          className='absolute bottom-32 left-20 animate-float'
          style={{ animationDelay: '2s' }}
        >
          <Heart className='w-7 h-7 text-emerald-400 animate-sparkle' />
        </div>
        <div
          className='absolute top-60 left-1/3 animate-float'
          style={{ animationDelay: '0.5s' }}
        >
          <Sparkles className='w-5 h-5 text-green-300 animate-twinkle' />
        </div>
        <div
          className='absolute bottom-20 right-1/4 animate-float'
          style={{ animationDelay: '1.5s' }}
        >
          <Star className='w-9 h-9 text-emerald-200 animate-sparkle' />
        </div>
        <div
          className='absolute top-32 right-1/3 animate-float'
          style={{ animationDelay: '2.5s' }}
        >
          <Heart className='w-4 h-4 text-green-300 animate-twinkle' />
        </div>
        <div
          className='absolute bottom-40 left-1/2 animate-float'
          style={{ animationDelay: '3s' }}
        >
          <Sparkles className='w-6 h-6 text-emerald-400 animate-sparkle' />
        </div>
      </div>

      <div className='relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12'>
        <div className='text-center mb-12 animate-bounce-gentle'>
          <h1 className='font-serif text-5xl md:text-7xl font-bold text-slate-700 mb-4 tracking-tight magic-text'>
            Share Your Spark of Magic!
          </h1>
          <p className='text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed animate-slide-in-magic'>
            Your ideas can make this place shine brighter. ✨
          </p>
        </div>

        <div className='w-full max-w-2xl animate-float'>
          <SuggestionForm />
        </div>

        <div
          className='mt-12 text-center animate-bounce-gentle'
          style={{ animationDelay: '1s' }}
        >
          <p className='text-slate-500 text-sm animate-twinkle'>
            Every great idea starts with a single spark
          </p>
        </div>
      </div>
    </div>
  )
}
