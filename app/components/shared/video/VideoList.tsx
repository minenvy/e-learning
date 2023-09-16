"use client"

import Card from "@/app/components/shared/Card"
import useDebounce from "@/app/hooks/use-debounce"
import { Input } from "antd"
import { useEffect, useState } from "react"
import styled from "styled-components"
import InfiniteScroll from "@/app/components/shared/InfiniteScroll"
import Loading from "@/app/components/shared/Loading"
import MoreOutlinedButton from "@/app/components/shared/writing/MoreOutlinedButton"
import Video from "@/app/interfaces/video"
import { deleteVideo, getVideos } from "@/app/services/video"
import { videoThumbnailLink } from "@/app/constants/video-thumbnail"

const searchWidth = 300
const maxNumberOfVideoEachGet = 10
const detailUrl = "/video/"

export default function VideoList() {
  const { previousValue, value, onChange } = useDebounce("")
  const [videos, setVideos] = useState<Video[]>([])
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setHasMore(true)
    setVideos([])
  }, [value])

  const changeSearchKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }
  const next = async (skip: number) => {
    const data = await getVideos(value as string, skip)
    if (!data || data.length === 0 || data.length < maxNumberOfVideoEachGet) {
      setHasMore(false)
    }
    if (data && data.length > 0) {
      setVideos((preState) => [...preState, ...data])
    }
  }
  const deleteVideoInList = (id: string) => {
    deleteVideo(id)
    setVideos((preState) => preState.filter((v) => v.id !== id))
  }

  return (
    <Wrapper>
      <InputBox>
        <Input.Search
          value={previousValue}
          placeholder="Tìm kiếm tên video..."
          style={{ width: searchWidth }}
          onChange={changeSearchKey}
        />
      </InputBox>
      <InfiniteScroll
        dataLength={videos.length}
        hasMore={hasMore}
        loader={<Loading />}
        next={next}
      >
        {videos.map((video) => {
          return (
            <Card
              key={video.id}
              image={videoThumbnailLink.replace(
                "videoId",
                video.youtubeVideoId,
              )}
              {...video}
              description={
                video?.createdAt ? new Date(video.createdAt).toDateString() : ""
              }
              link={`${detailUrl}${video.youtubeVideoId}`}
              more={
                <MoreOutlinedButton
                  items={[{ key: 0, label: "Delete" }]}
                  onClicks={[() => deleteVideoInList(video.id!)]}
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
  margin: 20px 0;
`
const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
