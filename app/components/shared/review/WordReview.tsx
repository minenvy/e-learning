"use client"

import CloseButton from "@/app/components/shared/CloseButton"
import Word from "@/app/interfaces/word"
import styled from "styled-components"
import ShadowBox from "@/app/components/ui/ShadowBox"
import ListenOrReadAndWrite from "./ListenOrReadAndWrite"
import { useState } from "react"
import ProgressBar from "@/app/components/ui/ProgressBar"
import { useRouter } from "next/navigation"
import Summary from "@/app/components/ui/Summary"
import {
  updateForgotLevel,
  updateLevel,
  updateToMaxLevel,
} from "@/app/services/update-word"

const exitUrl = "/general"

type Props = {
  words: Word[]
}

export default function WordReview({ words }: Props) {
  const router = useRouter()
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [maxLevelWord, setMaxLevelWord] = useState<Word[]>([])
  const [forgotWord, setForgotWord] = useState<Word[]>([])
  const [passWord, setPassWord] = useState<Word[]>([])
  const [isSummary, setIsSummary] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const progressWidth = (currentWordIndex / (words.length - 1)) * 100
  const learnResultPercent = Math.round(
    ((maxLevelWord.length + passWord.length) / words.length) * 100,
  )
  const isDone = currentWordIndex === words.length - 1

  const exit = () => router.push(exitUrl)
  const next = () => {
    if (!isDone) setCurrentWordIndex((preState) => preState + 1)
    else setIsSummary(true)
  }
  const review = (maxLevel: boolean, isCorrect?: boolean) => {
    if (maxLevel) {
      setMaxLevelWord((preState) => [...preState, words[currentWordIndex]])
      return
    }
    if (isCorrect) {
      setPassWord((preState) => [...preState, words[currentWordIndex]])
      return
    }
    setForgotWord((preState) => [...preState, words[currentWordIndex]])
  }
  const reviewAndNext = (maxLevel: boolean, isCorrect?: boolean) => {
    review(maxLevel, isCorrect)
    next()
  }
  const done = async () => {
    if (isLoading) return
    setIsLoading(true)

    await updateToMaxLevel(maxLevelWord.map((word) => word.enWord))
    await updateForgotLevel(forgotWord.map((word) => word.enWord))
    await updateLevel(passWord.map((word) => word.enWord))

    setIsLoading(false)
    exit()
  }

  return (
    <>
      {!isSummary ? (
        <>
          <ProgressBar percent={progressWidth}>
            <CloseButton onClick={exit} />
          </ProgressBar>
          <CenterBox>
            <ShadowBox>
              <ListenOrReadAndWrite
                word={words[currentWordIndex]}
                next={reviewAndNext}
                key={currentWordIndex}
              />
            </ShadowBox>
          </CenterBox>
        </>
      ) : (
        <Summary
          progressValue={learnResultPercent}
          type="percent"
          isProcessing={isLoading}
          onOk={done}
          words={words}
        />
      )}
    </>
  )
}

const CenterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`
