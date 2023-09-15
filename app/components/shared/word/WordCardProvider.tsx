"use client"

import LearningWord from "@/app/interfaces/learning-word"
import {
  getWordInfoFromOtherApi,
  getWordInfoFromServerApi,
} from "@/app/services/learning-word"
import { useEffect, useState } from "react"
import { styled } from "styled-components"
import WordCard from "./WordCard"
import Word from "@/app/interfaces/word"
import Loading from "@/app/components/shared/Loading"

type Props = {
  word: string
  addInfoWord?: (word: Word) => void
}

export default function WordCardProvider({ word, addInfoWord }: Props) {
  const [learningWord, setLearningWord] = useState<LearningWord | null>()

  useEffect(() => {
    fetchData()
  }, [word])

  const fetchData = async () => {
    const firstFullWord = await getWordInfoFromOtherApi(word)
    const secondFullWord = await getWordInfoFromServerApi(word)
    const thisWord = { ...secondFullWord, ...firstFullWord }
    setLearningWord(thisWord)
    if (thisWord && addInfoWord) addInfoWord(thisWord)
  }

  if (learningWord === undefined)
    return (
      <Wrapper>
        <Loading />
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
