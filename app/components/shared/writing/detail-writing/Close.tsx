"use client"

import { useRouter } from "next/navigation"
import CloseButton from "@/app/components/shared/CloseButton"

const writingUrl = "/writing"

export default function Close() {
  const router = useRouter()

  const exit = () => router.push(writingUrl)

  return <CloseButton onClick={exit} />
}
