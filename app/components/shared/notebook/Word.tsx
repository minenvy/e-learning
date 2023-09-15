"use client"

import { Modal } from "antd"
import { styled } from "styled-components"
import ShadowBox from "@/app/components/ui/ShadowBox"
import WordCardProvider from "@/app/components/shared/word/WordCardProvider"

type Props = {
  enWord: string
  definition: string
  type: string
}

export default function Word({ enWord, definition, type }: Props) {
  const showInfo = () => {
    Modal.info({
      title: "Thông tin từ",
      content: (
        <ShadowBox>
          <WordCardProvider word={enWord} />
        </ShadowBox>
      ),
    })
  }

  return (
    <Wrapper onClick={showInfo}>
      <EnWord>{enWord}</EnWord>
      <Type>{`(${type})`}</Type>
      <Definition>{definition}</Definition>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  cursor: pointer;
`
const EnWord = styled.h2`
  flex: 5;
  text-align: center;
`
const Type = styled.p`
  flex: 2;
  text-align: center;
`
const Definition = styled.p`
  flex: 5;
  text-align: center;
`
