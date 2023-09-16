"use client"

import styled from "styled-components"
import CloseButton from "@/app/components/shared/CloseButton"
import { useRouter } from "next/navigation"
import VideoCard from "@/app/components/shared/video/detail-video/VideoCard"
import PracticeCard from "@/app/components/shared/video/detail-video/PracticeCard"

const exitUrl = "/video"

export default function VideoItem() {
  const router = useRouter()

  const exit = () => router.push(exitUrl)

  return (
    <GrayBox>
      <ExitButton>
        <CloseButton onClick={exit} />
      </ExitButton>
      <Main>
        <VideoBoundary>
          <VideoCard />
        </VideoBoundary>
        <PracticeBoundary>
          <PracticeCard />
        </PracticeBoundary>
      </Main>
    </GrayBox>
  )
}

const GrayBox = styled.div`
  width: calc(100% - 36px);
  height: 100%;
  background-color: #f8f8f8;
  padding: 30px;
  overflow: auto;
`
const ExitButton = styled.div`
  height: 30px;
`
const Main = styled.div`
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
`
const Boundary = styled.div`
  border-radius: 20px;
  border: 1px solid #ddd;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  padding: 16px;
`
const VideoBoundary = styled(Boundary)`
  flex: 2;
`
const PracticeBoundary = styled(Boundary)`
  flex: 3;
`
