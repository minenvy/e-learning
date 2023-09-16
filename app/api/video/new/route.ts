import { connectToDb } from "@/app/lib/mongoose"
import Video from "@/app/mongodb/video.model"
import { getAuth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

const message = "Thêm video thành công"

export async function POST(req: NextRequest) {
  const { title, youtubeVideoId } = await req.json()
  console.log(title, youtubeVideoId)

  const { userId } = getAuth(req)

  await connectToDb()

  const video = new Video({
    title,
    youtubeVideoId,
    userId,
  })
  await video.save()

  return NextResponse.json({
    message,
  })
}
