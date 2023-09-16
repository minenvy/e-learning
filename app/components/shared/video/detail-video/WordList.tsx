"use client"

import { speak } from "@/app/lib/utils/speak"
import { styled } from "styled-components"

type Props = {
  words: string[]
}

export default function WordList({ words }: Props) {
  const speakContent = async (word: string) => {
    await speak(word)
  }

  return (
    <Wrapper>
      {words.map((word, index) => {
        return (
          <WordBoundary key={index}>
            <Text>{word}</Text>
            <ImgBoundary>
              <StyledImg
                src="/images/sound.svg"
                alt="icon"
                onClick={() => speakContent(word)}
              />
            </ImgBoundary>
          </WordBoundary>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  max-height: 40vh;
  overflow: auto;
  margin: 20px 0;
`
const WordBoundary = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 16px;
  margin: 8px 0;
`
const Text = styled.p`
  text-align: center;
  flex: 1;
`
const ImgBoundary = styled.div`
  width: 20%;
`
const StyledImg = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid #ddd;
  cursor: pointer;

  &:active {
    background-color: #ddd;
  }
`
