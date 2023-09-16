"use client"

import CenterAlignBox from "@/app/components/ui/CenterAlignBox"
import Word from "@/app/components/shared/notebook/Word"
import styled from "styled-components"
import { Input } from "antd"
import useDebounce from "@/app/hooks/use-debounce"
import WordType from "@/app/interfaces/word"
import { useEffect, useState } from "react"
import { getWordForNoteBook } from "@/app/services/notebook"
import InfiniteScroll from "@/app/components/shared/InfiniteScroll"
import Loading from "@/app/components/shared/Loading"

const searchWidth = 300
const maxNumberOfWordEachGet = 10

type Props = {
  level: string
}

export default function WordList({ level }: Props) {
  const { previousValue, value, onChange } = useDebounce("")
  const [words, setWords] = useState<WordType[]>([])
  const [hasMoreWord, setHasMoreWord] = useState(true)

  useEffect(() => {
    setHasMoreWord(true)
    setWords([])
  }, [value])

  const changeSearchKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }
  const next = async (skip: number) => {
    const data = await getWordForNoteBook(Number(level), value as string, skip)
    if (!data || data.length === 0 || data.length < maxNumberOfWordEachGet) {
      setHasMoreWord(false)
    }
    if (data && data.length > 0) {
      setWords((preState) => [...preState, ...data])
    }
  }

  return (
    <CenterAlignBox>
      <Wrapper>
        <InputBox>
          <Input.Search
            value={previousValue}
            placeholder="Tìm kiếm tên từ tiếng Anh..."
            style={{ width: searchWidth }}
            onChange={changeSearchKey}
          />
        </InputBox>

        <InfiniteScroll
          dataLength={words.length}
          next={next}
          loader={<Loading />}
          hasMore={hasMoreWord}
        >
          <WordBoundary>
            {words.map((word, index) => {
              return <Word {...word} key={index} />
            })}
          </WordBoundary>
        </InfiniteScroll>
      </Wrapper>
    </CenterAlignBox>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-bottom: 20px;
`
const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const WordBoundary = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`
