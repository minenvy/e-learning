"use client"

import Card from "@/app/components/shared/Card"
import useDebounce from "@/app/hooks/use-debounce"
import Paragraph from "@/app/interfaces/paragraph"
import { Input } from "antd"
import { useEffect, useState } from "react"
import styled from "styled-components"
import InfiniteScroll from "@/app/components/shared/InfiniteScroll"
import { deleteWriting, getWritings } from "@/app/services/writing"
import Loading from "@/app/components/shared/Loading"
import MoreOutlinedButton from "@/app/components/shared/writing/MoreOutlinedButton"

const searchWidth = 300
const maxNumberOfWritingEachGet = 10
const detailUrl = "/writing/"

export default function WritingList() {
  const { previousValue, value, onChange } = useDebounce("")
  const [writings, setWritings] = useState<Paragraph[]>([])
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setHasMore(true)
    setWritings([])
  }, [value])

  const changeSearchKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }
  const next = async (skip: number) => {
    const data = await getWritings(value as string, skip)
    if (!data || data.length === 0 || data.length < maxNumberOfWritingEachGet) {
      setHasMore(false)
    }
    if (data && data.length > 0) {
      setWritings((preState) => [...preState, ...data])
    }
  }
  const deleteWritingInList = (id: string) => {
    deleteWriting(id)
    setWritings((preState) => preState.filter((w) => w.id !== id))
  }

  return (
    <Wrapper>
      <InputBox>
        <Input.Search
          value={previousValue}
          placeholder="Tìm kiếm tên bài viết..."
          style={{ width: searchWidth }}
          onChange={changeSearchKey}
        />
      </InputBox>
      <InfiniteScroll
        dataLength={writings.length}
        hasMore={hasMore}
        loader={<Loading />}
        next={next}
      >
        {writings.map((writing) => {
          return (
            <Card
              key={writing.id}
              {...writing}
              description={
                writing?.createdAt
                  ? new Date(writing.createdAt).toDateString()
                  : ""
              }
              link={`${detailUrl}${writing.id!}`}
              more={
                <MoreOutlinedButton
                  items={[{ key: 0, label: "Delete" }]}
                  onClicks={[() => deleteWritingInList(writing.id!)]}
                />
              }
            />
          )
        })}
      </InfiniteScroll>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
`
const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
