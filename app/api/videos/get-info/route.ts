import { connectToDb } from "@/app/lib/mongoose"
import Video from "@/app/mongodb/video.model"
import { getAuth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

const maxNumberOfVideoEachGet = 10

export async function POST(req: NextRequest) {
  const { query, skip } = await req.json()

  const { userId } = getAuth(req)

  await connectToDb()

  const videos = await Video.find({ userId })
  const data = videos
    .filter((video) => video.title.toLowerCase().includes(query.toLowerCase()))
    .slice(skip, skip + maxNumberOfVideoEachGet)
    .map((video) => {
      return {
        id: video._id.toString(),
        title: video.title,
        youtubeVideoId: video.youtubeVideoId,
        createdAt: video.createdAt,
      }
    })

  return NextResponse.json(data)
}
