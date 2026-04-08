import { useEffect, useRef } from 'react'

export function useReveal(options: IntersectionObserverInit = { threshold: 0.12 }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return
      el.dataset.revealed = 'true'
      obs.disconnect()
    }, options)

    obs.observe(el)
    return () => obs.disconnect()
  }, [options])

  return ref
}

export function Reveal({
  children,
  className = '',
  delayMs = 0,
}: {
  children: React.ReactNode
  className?: string
  delayMs?: number
}) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  )
}

