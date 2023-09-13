"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
  dataLength: number
  next: (skip: number) => Promise<void>
  loader: React.ReactNode
  children: React.ReactNode
  hasMore: boolean
}

export default function InfiniteScroll({
  dataLength,
  next,
  loader,
  children,
  hasMore,
}: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setIsLoading(true)
          await next(dataLength)
          setIsLoading(false)
        }
      },
      { threshold: 1 },
    )
    if (observerTarget.current) observer.observe(observerTarget.current)

    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current)
    }
  }, [observerTarget, hasMore, dataLength])

  return (
    <div>
      {children}
      {isLoading && loader}
      <div ref={observerTarget}></div>
    </div>
  )
}
