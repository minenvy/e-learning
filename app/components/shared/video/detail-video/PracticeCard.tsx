"use client"

import { getTranscription } from "@/app/services/video"
import { Steps } from "antd"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { styled } from "styled-components"
import WordList from "./WordList"
import Button from "@/app/components/ui/Button"
import { getWordsToListen } from "@/app/lib/utils/get-words-to-listen"
import { getDividedTranscript } from "@/app/lib/utils/get-divided-transcript"
import FillWord from "./FillWord"
import Loading from "@/app/components/shared/Loading"

const maxStep = 2
const exitUrl = "/video"

export default function PracticeCard() {
  const { videoId } = useParams()
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [transcript, setTranscript] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckedFillWord, setIsCheckedFillWord] = useState(false)

  const items = [
    {
      title: "Nghe bắt âm",
    },
    {
      title: "Nghe vận dụng",
    },
    {
      title: "Nghe chi tiết",
    },
  ]
  const isDone = step === maxStep
  const isCheckedStepIndexOne = step !== 1 || (step === 1 && isCheckedFillWord)

  useEffect(() => {
    const fetchTranscript = async () => {
      setIsLoading(true)
      const res = await getTranscription(videoId as string)
      if (res) setTranscript(res.transcript)
      setIsLoading(false)
    }

    fetchTranscript()
  }, [])

  const listWord = useMemo(() => {
    return getWordsToListen(transcript)
  }, [transcript])

  const partsOfTranscript = useMemo(() => {
    return getDividedTranscript(transcript, listWord)
  }, [transcript, listWord.length])

  const exit = () => router.push(exitUrl)
  const next = () => {
    if (!isDone) setStep((preState) => preState + 1)
    else exit()
  }
  const checkFillWord = () => setIsCheckedFillWord(true)

  return (
    <Wrapper>
      <Steps size="small" current={step} items={items} />
      {isLoading && <Loading />}
      {step === 0 && <WordList words={listWord} />}
      {step === 1 && (
        <FillWord
          words={listWord}
          paragraphParts={partsOfTranscript}
          onCheck={checkFillWord}
        />
      )}
      {step === 2 && <StyledP>{transcript}</StyledP>}
      {isCheckedStepIndexOne && (
        <ButtonBoundary>
          <Button onClick={next}>{isDone ? "Hoàn thành" : "Tiếp theo"}</Button>
        </ButtonBoundary>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`
const ButtonBoundary = styled.div`
  margin-top: 16px;
  text-align: center;
`
const StyledP = styled.p`
  width: 100%;
  max-height: 40vh;
  overflow: auto;
  margin: 20px 0;
  line-height: 2.5;
`
