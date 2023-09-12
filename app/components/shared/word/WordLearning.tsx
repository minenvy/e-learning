"use client"

import CloseButton from "@/app/components/shared/CloseButton"
import { useParams, useRouter } from "next/navigation"
import { styled } from "styled-components"
import ShadowBox from "@/app/components/ui/ShadowBox"
import WordCardProvider from "./WordCardProvider"
import { useState } from "react"
import Button from "@/app/components/ui/Button"
import { Progress, Spin } from "antd"
import WordType from "@/app/interfaces/word"
import { addMaxLevelWords, addNewWords } from "@/app/services/new-word"
import { updateLearnedWordCountInTopic } from "@/app/services/dictionary"

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

    setIsLoading(false)
    exit()
  }

  return (
    <>
      {!isSummary ? (
        <>
          <ProgressBox>
            <ProgressBoundary>
              <ProgressBar style={{ width: `${progressWidth}%` }} />
            </ProgressBoundary>
            <CloseButton onClick={exit} />
          </ProgressBox>
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
        <CenterBox>
          <Progress
            type="circle"
            percent={100}
            format={() => `${fullInfoWords.length} từ`}
          />
          <div>
            {fullInfoWords.map((word, index) => {
              return (
                <Word key={index}>
                  <EnglishWord>{word.enWord}</EnglishWord>
                  <Type>{`(${word.type})`}</Type>
                  <Definition>{word.definition}</Definition>
                </Word>
              )
            })}
          </div>
          <Button onClick={done}>{isLoading ? <Spin /> : "OK"}</Button>
        </CenterBox>
      )}
    </>
  )
}

const ProgressBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;
`
const ProgressBoundary = styled.div`
  width: 100%;
  height: 20px;
  border-radius: 16px;
  background-color: #e0e0e0;
`
const ProgressBar = styled.div`
  height: 20px;
  border-radius: 16px;
  background-color: #27ac38;
`
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
