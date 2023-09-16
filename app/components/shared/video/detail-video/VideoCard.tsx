"use client"

import { styled } from "styled-components"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getTitle } from "@/app/services/video"
import IframeVideoYoutube from "@/app/components/shared/IframeVideoYoutube"

export default function VideoCard() {
  const { videoId } = useParams()
  const [title, setTitle] = useState("")

  useEffect(() => {
    const fetchTitle = async () => {
      setTitle(await getTitle(videoId as string))
    }

    fetchTitle()
  }, [])

  return (
    <Wrapper>
      <h2>{title}</h2>
      <IframeVideoYoutube videoId={videoId as string} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  iframe {
    border-radius: 8px;
  }
`
