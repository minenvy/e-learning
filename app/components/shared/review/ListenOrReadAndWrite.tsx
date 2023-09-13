"use client"

import Word from "@/app/interfaces/word"
import { speak } from "@/app/lib/utils/speak"
import styled from "styled-components"
import { useState } from "react"
import Button from "@/app/components/ui/Button"
import { Input } from "antd"

const reviewTypes = ["listen", "read"]
type ReviewType = "listen" | "read"
type Props = {
  word: Word
  next: (maxLevel: boolean, isCorrect?: boolean) => void
}

export default function ListenOrReadAndWrite({ word, next }: Props) {
  const [answer, setAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean>()

  const isChecked = isCorrect !== undefined
  const inputTextColor = {
    color: isCorrect ? "#00c400" : "red",
  }
  let reviewType: ReviewType = "listen"
  const hasExample = word?.example
  if (hasExample) {
    const rand = Math.floor(Math.random() * 2)
    reviewType = reviewTypes[rand] as ReviewType
  }

  const speakWord = async () => {
    await speak(word.enWord)
  }
  const changeInputWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value)
  }
  const check = () => {
    setIsCorrect(answer === word.enWord)
  }
  const continueLearn = () => {
    next(false, isCorrect)
  }
  const skip = () => {
    next(true)
  }

  return (
    <Wrapper>
      {reviewType === "listen" && (
        <IconBoundary>
          <div onClick={speakWord}>
            <Icon src="/images/sound.svg" alt="sound" />
          </div>
        </IconBoundary>
      )}
      {reviewType === "read" && (
        <p>
          {word.example?.replace(
            word.enWord,
            Array(word.enWord.length).fill("_").join(""),
          )}
        </p>
      )}
      {isChecked && <StyledP>{word.enWord}</StyledP>}
      <InputBoundary>
        <Input
          value={answer}
          onChange={changeInputWord}
          placeholder="Nhập từ..."
          style={isChecked ? inputTextColor : {}}
        />
      </InputBoundary>
      {!isChecked && <Button onClick={check}>Kiểm tra</Button>}
      {isChecked && <Button onClick={continueLearn}>Tiếp tục</Button>}
      {!(isChecked && !isCorrect) && (
        <UnderlineText onClick={skip}>Mình đã thuộc từ này</UnderlineText>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 30px;
`
const IconBoundary = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin: 16px 0;
`
const Icon = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid #ddd;
  box-shadow: 0 4px #a5a5a5;
  transition: all 0.3s;
  cursor: pointer;

  &:active {
    box-shadow: none;
    transform: translateY(2px);
  }
`
const StyledP = styled.p`
  text-align: center;
`
const InputBoundary = styled.div`
  width: 80%;
`
const UnderlineText = styled.span`
  text-decoration: underline;
  cursor: pointer;
`
