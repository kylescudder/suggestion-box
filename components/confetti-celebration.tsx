"use client"

import { useEffect, useState } from "react"

interface ConfettiCelebrationProps {
  show: boolean
  onComplete: () => void
}

export function ConfettiCelebration({ show, onComplete }: ConfettiCelebrationProps) {
  const [confettiPieces, setConfettiPieces] = useState<Array<{ id: number; left: number; delay: number }>>([])

  useEffect(() => {
    if (show) {
      // Generate confetti pieces
      const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
      }))
      setConfettiPieces(pieces)

      // Clean up after animation
      const timer = setTimeout(() => {
        setConfettiPieces([])
        onComplete()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  if (!show) return null

  return (
    <div className="celebration-overlay">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
