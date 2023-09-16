"use client"

import CloseButton from "@/app/components/shared/CloseButton"
import IframeVideoYoutube from "@/app/components/shared/IframeVideoYoutube"
import Button from "@/app/components/ui/Button"
import CenterAlignBox from "@/app/components/ui/CenterAlignBox"
import Form from "@/app/components/ui/Form"
import Input from "@/app/components/ui/Input"
import { addVideo, getTranscription } from "@/app/services/video"
import { Spin, message } from "antd"
import { useRouter } from "next/navigation"
import { useState } from "react"
import styled from "styled-components"

const exitUrl = "/video"
const paramVariable = "v"
const warningVideoMessage =
  "Lỗi lấy thông tin video này. Vui lòng chọn video khác"
const warningFormInfoMessage = "Thêm đầy đủ thông tin nhé"

export default function NewVideo() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [link, setLink] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  let videoId = ""
  if (link) {
    try {
      const url = new URL(link)
      const searchUrl = new URLSearchParams(url.searchParams)
      videoId = searchUrl.get(paramVariable)!
    } catch (err) {
      console.log(err)
    }
  }

  const exit = () => router.push(exitUrl)
  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
  const changeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value)
  }
  const validate = () => title && link
  const add = async () => {
    if (!validate()) {
      message.warning(warningFormInfoMessage)
      return
    }
    if (isLoading) return
    setIsLoading(true)

    const transcript = await getTranscription(videoId)
    if (!transcript) {
      message.warning(warningVideoMessage)
      return
    }

    const res = await addVideo({
      title,
      youtubeVideoId: videoId,
    })

    setIsLoading(false)
    if (res) exit()
  }

  return (
    <CenterAlignBox>
      <FlexBox>
        <MarginBoundary>
          <Form>
            <CloseButtonBoundary>
              <CloseButton onClick={exit} />
            </CloseButtonBoundary>
            <MarginBoundary>
              <RequiredBoundary data-has-value={!!title}>
                <Input label="Tiêu đề" value={title} onChange={changeTitle} />
              </RequiredBoundary>
            </MarginBoundary>
            <MarginBoundary>
              <RequiredBoundary data-has-value={!!link}>
                <Input
                  label="Link video youtube"
                  value={link}
                  onChange={changeLink}
                />
              </RequiredBoundary>
            </MarginBoundary>
            {videoId && (
              <MarginBoundary>
                <IframeVideoYoutube videoId={videoId} />
              </MarginBoundary>
            )}
            <MarginBoundary>
              <FlexBox>
                <Button onClick={add}>{isLoading ? <Spin /> : "Thêm"}</Button>
              </FlexBox>
            </MarginBoundary>
          </Form>
        </MarginBoundary>
      </FlexBox>
    </CenterAlignBox>
  )
}

const MarginBoundary = styled.div`
  margin-bottom: 24px;
`
const FlexBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const CloseButtonBoundary = styled.div`
  height: 30px;
  margin-bottom: 20px;
`
const RequiredBoundary = styled.div`
  &[data-has-value="false"] {
    border-radius: 4px;
    border-bottom: 1px solid #f04438;
  }
`
