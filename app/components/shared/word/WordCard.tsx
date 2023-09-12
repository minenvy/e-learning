"use client"

import LearningWord from "@/app/interfaces/learning-word"
import { speak } from "@/app/lib/utils/speak"
import { useEffect, useState } from "react"
import styled from "styled-components"

type Props = {
  word: LearningWord
}

export default function WordCard({ word }: Props) {
  const [isFlipped, setIsFlipped] = useState(false)

  const {
    enWord,
    type,
    vieWord,
    definition,
    synonyms,
    antonyms,
    example,
    phonetic,
    image,
  } = word
  let frontExample = ""
  let backExample = ""
  if (example) {
    const partExample = example.split(enWord)
    frontExample = partExample[0]
    backExample = partExample[1]
  }

  useEffect(() => {
    setIsFlipped(false)
  }, [word])

  const rotate = () => {
    setIsFlipped(!isFlipped)
  }
  const speakWord = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    await speak(enWord)
  }

  return (
    <Wrapper onClick={rotate}>
      <IconBoundary>
        <div onClick={speakWord}>
          <Icon src="/images/sound.svg" alt="sound" />
        </div>
        {/* <Icon src="/images/sync.svg" alt="sync" /> */}
      </IconBoundary>
      {isFlipped ? (
        <Card>
          {image && <Img src={image} alt="image" />}
          {
            <p>
              Ví dụ:
              {frontExample}
              {example && (
                <b>
                  <u>{enWord}</u>
                </b>
              )}
              {backExample}
            </p>
          }
          {<p>Từ đồng nghĩa: {synonyms || ""}</p>}
          {<p>Từ trái nghĩa: {antonyms || ""}</p>}
        </Card>
      ) : (
        <Card>
          <p>{enWord}</p>
          {phonetic && <p>{phonetic}</p>}
          <p>{`(${type})`}</p>
          <p>{definition}</p>
          {vieWord && <p>{vieWord}</p>}
        </Card>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  padding: 30px;
  cursor: pointer;
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
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;

  p {
    text-align: center;
  }
`
const Img = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
`
