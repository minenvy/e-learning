"use client"

import { useUser } from "@clerk/nextjs"

export default function Notebook() {
  const { user } = useUser()
  console.log(user)

  return (
    <main>
      <p>General</p>
    </main>
  )
}
