"use client"

import { speak } from "@/app/lib/utils/speak"
import draftToHtml from "draftjs-to-html"
import { useEffect, useState } from "react"

type Props = {
  content: string
}

export default function Sound({ content }: Props) {
  const [paragraph, setParagraph] = useState("")

  useEffect(() => {
    const paragraphHtml = draftToHtml(JSON.parse(content))
    const div = document.createElement("div")
    div.innerHTML = paragraphHtml
    const text = div ? (div.textContent as string) : ""
    if (text) setParagraph(text)
  }, [])

  const speakContent = async () => {
    await speak(paragraph)
  }

  return <img src="/images/sound.svg" alt="icon" onClick={speakContent} />
}
