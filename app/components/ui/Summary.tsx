"use client"

import styled from "styled-components"
import Button from "./Button"
import { Progress, Spin } from "antd"
import Word from "@/app/interfaces/word"

type Props = {
  progressValue: number
  type: "percent" | "count"
  words: Word[]
  onOk: () => void
  isProcessing: boolean
}

export default function Summary({
  progressValue,
  type,
  words,
  onOk,
  isProcessing,
}: Props) {
  return (
    <CenterBox>
      {type === "count" && (
        <Progress
          type="circle"
          percent={100}
          format={() => `${progressValue} từ`}
        />
      )}
      {type === "percent" && (
        <Progress
          type="circle"
          percent={progressValue}
          format={() => `${progressValue} %`}
        />
      )}
      <div>
        {words.map((word, index) => {
          return (
            <Word key={index}>
              <EnglishWord>{word.enWord}</EnglishWord>
              <Type>{`(${word.type})`}</Type>
              <Definition>{word.definition}</Definition>
            </Word>
          )
        })}
      </div>
      <Button onClick={onOk}>{isProcessing ? <Spin /> : "OK"}</Button>
    </CenterBox>
  )
}

const CenterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
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
