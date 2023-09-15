"use client"

import CloseButton from "@/app/components/shared/CloseButton"
import { useParams, useRouter } from "next/navigation"
import { styled } from "styled-components"
import ShadowBox from "@/app/components/ui/ShadowBox"
import WordCardProvider from "./WordCardProvider"
import { useState } from "react"
import Button from "@/app/components/ui/Button"
import WordType from "@/app/interfaces/word"
import { addMaxLevelWords, addNewWords } from "@/app/services/new-word"
import { updateLearnedWordCountInTopic } from "@/app/services/dictionary"
import ProgressBar from "@/app/components/ui/ProgressBar"
import Summary from "@/app/components/ui/Summary"
import { updateStreak } from "@/app/services/streak"

const exitUrl = "/word"

type Props = {
  words: string[]
}

export default function WordLearning({ words }: Props) {
  const router = useRouter()
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [fullInfoWords, setFullInfoWords] = useState<WordType[]>([])
  const [needReviewWord, setNeedReviewWord] = useState<number[]>([])
  const [isSummary, setIsSummary] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()

  const progressWidth = (currentWordIndex / (words.length - 1)) * 100
  const isDone = currentWordIndex === words.length - 1

  const exit = () => router.push(exitUrl)
  const addInfoWord = (word: WordType) =>
    setFullInfoWords((preState) => [...preState, word])
  const next = () => {
    if (!isDone) setCurrentWordIndex((preState) => preState + 1)
    else setIsSummary(true)
  }
  const nextWithSaveWord = () => {
    setNeedReviewWord((preState) => [...preState, currentWordIndex])
    next()
  }
  const done = async () => {
    if (isLoading) return
    setIsLoading(true)

    // Get full info of need review words
    const mustReviewWord: WordType[] = []
    const maxLevelWord: WordType[] = []
    words.forEach((word, index) => {
      const fullWord = fullInfoWords.find((w) => w.enWord === word)
      if (fullWord) {
        if (needReviewWord.includes(index)) mustReviewWord.push(fullWord)
        else maxLevelWord.push(fullWord)
      }
    })

    // Get topic and count from params
    const { topic, learnedCount } = params

    // Update to database
    await addNewWords(mustReviewWord)
    await addMaxLevelWords(maxLevelWord)
    await updateLearnedWordCountInTopic(
      topic as string,
      Number(learnedCount) + words.length,
    )
    await updateStreak()

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
              <WordCardProvider
                word={words[currentWordIndex]}
                addInfoWord={addInfoWord}
              />
            </ShadowBox>
            <Button onClick={nextWithSaveWord}>
              {!isDone ? "Tiếp theo" : "Hoàn thành"}
            </Button>
            <UnderlineText onClick={next}>Mình đã thuộc từ này</UnderlineText>
          </CenterBox>
        </>
      ) : (
        <Summary
          progressValue={fullInfoWords.length}
          type="count"
          isProcessing={isLoading}
          onOk={done}
          words={fullInfoWords}
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
const UnderlineText = styled.span`
  text-decoration: underline;
  cursor: pointer;
`
const Word = styled.div`
  display: flex;
  gap: 16px;
`
const EnglishWord = styled.p`
  flex: 2;
`
const Type = styled.p`
  flex: 1;
`
const Definition = styled.p`
  flex: 3;
`
