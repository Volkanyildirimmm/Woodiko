'use client'

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { ChevronsLeftRight } from 'lucide-react'

interface BeforeAfterSliderProps {
  before: { src: string; alt: string }
  after: { src: string; alt: string }
  className?: string
}

export function BeforeAfterSlider({ before, after, className = '' }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }, [])

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    updatePosition(e.clientX)
  }

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return
    updatePosition(e.clientX)
  }, [updatePosition])

  const onMouseUp = () => { isDragging.current = false }

  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true
    updatePosition(e.touches[0].clientX)
  }

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return
    updatePosition(e.touches[0].clientX)
  }, [updatePosition])

  const onTouchEnd = () => { isDragging.current = false }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl select-none cursor-col-resize ${className}`}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* After (full width, behind) */}
      <div className="relative w-full h-full">
        <Image
          src={after.src}
          alt={after.alt}
          fill
          className="object-cover pointer-events-none"
          sizes="(max-width: 768px) 100vw, 50vw"
          draggable={false}
        />
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-gold text-wood-dark text-xs font-bold rounded">
          SONRA
        </div>
      </div>

      {/* Before (clipped) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before.src}
          alt={before.alt}
          fill
          className="object-cover pointer-events-none"
          sizes="(max-width: 768px) 100vw, 50vw"
          draggable={false}
        />
        <div className="absolute bottom-3 left-3 px-2 py-1 bg-charcoal/80 text-cream text-xs font-bold rounded">
          ÖNCE
        </div>
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-xl flex items-center justify-center">
          <ChevronsLeftRight size={18} className="text-wood-dark" />
        </div>
      </div>
    </div>
  )
}
