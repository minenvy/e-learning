"use client"

import LearningWord from "@/app/interfaces/learning-word"
import { getWordInfo } from "@/app/services/learning-word"
import { Spin } from "antd"
import { useEffect, useState } from "react"
import { styled } from "styled-components"
import WordCard from "./WordCard"
import Word from "@/app/interfaces/word"

type Props = {
  word: string
  addInfoWord: (word: Word) => void
}

export default function WordCardProvider({ word, addInfoWord }: Props) {
  const [learningWord, setLearningWord] = useState<LearningWord | null>()

  useEffect(() => {
    fetchData()
  }, [word])

  const fetchData = async () => {
    const fullWord = await getWordInfo(word)
    setLearningWord(fullWord)
    if (fullWord) addInfoWord(fullWord)
  }

  if (learningWord === undefined)
    return (
      <Wrapper>
        <Spin />
      </Wrapper>
    )
  if (learningWord === null)
    return (
      <StyledP>Lỗi tải thông tin từ vựng hiện tại, vui lòng bỏ qua</StyledP>
    )

  return <WordCard word={learningWord} />
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledP = styled.p`
  padding: 16px;
`
