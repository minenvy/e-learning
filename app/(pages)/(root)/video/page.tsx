"use client"

import VideoList from "@/app/components/shared/video/VideoList"
import { tags } from "@/app/constants/fetch-tags"
import useDebounce from "@/app/hooks/use-debounce"
import { Input } from "antd"
import { useEffect } from "react"
import { styled } from "styled-components"

const searchWidth = 300

export default function Video() {
  const { previousValue, value, onChange } = useDebounce("")

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/video?videoId=VTK92nZIpJw", {
        next: { tags: [tags.youtubeTranscript] },
      })
      const data = await res.json()
      console.log(data)
    }
    fetchData()
  }, [])

  const changeSearchKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  // https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+transcript%2C+contentDetails&id=VTK92nZIpJw&key=AIzaSyB-WY5baEThim9I2WGaCBYEFbKb3OQ1W3c

  // https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=VTK92nZIpJw&key=AIzaSyB-WY5baEThim9I2WGaCBYEFbKb3OQ1W3c

  // https://www.googleapis.com/youtube/v3/videos?id=VTK92nZIpJw&part=snippet&key=AIzaSyB-WY5baEThim9I2WGaCBYEFbKb3OQ1W3c

  // https://www.googleapis.com/youtube/v3/captions/AUieDaZU7Pj9nTny1n8rO-gTT3lGdm8-12k2RjUa4f2uVw4YhRo?tfmt=srt&key=AIzaSyB-WY5baEThim9I2WGaCBYEFbKb3OQ1W3c

  // https://i.ytimg.com/vi/yCnM5VKYgik/hqdefault.jpg

  return (
    <main>
      <InputBox>
        <Input.Search
          value={previousValue}
          placeholder="Tìm kiếm tên video..."
          style={{ width: searchWidth }}
          onChange={changeSearchKey}
        />
      </InputBox>
      <VideoList filter={value.toString()} />
    </main>
  )
}

const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
