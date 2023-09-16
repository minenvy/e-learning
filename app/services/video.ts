import { message } from "antd"
import { get, post } from "./fetch"
import Video from "@/app/interfaces/video"
import { titleYoutubeApi, youtubeKey } from "@/app/constants/title-youtube-api"

const warningMessage = "Lỗi lấy thông tin video"

export async function getTranscription(videoId: string) {
  const res = await fetch(`/api/video/get-transcript?videoId=${videoId}`)
  if (!res || !res.ok) {
    message.warning(warningMessage)
    return null
  }
  return await res.json()
}

export async function getVideos(query: string, skip: number) {
  return await get("/api/videos/get-info", { query, skip })
}

export async function addVideo(video: Video) {
  return await post("/api/video/new", video)
}

export async function deleteVideo(id: string) {
  await post("/api/video/delete", { id })
}

export async function getTitle(id: string) {
  const res = await fetch(
    titleYoutubeApi.replace("videoId", id).replace("youtubeKey", youtubeKey),
  )
  const data = await res.json()
  return data.items[0].snippet.title
}
