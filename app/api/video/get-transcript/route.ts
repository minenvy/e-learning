import getYoutubeTranscript from "@/app/lib/utils/get-youtube-transcript"
import { NextRequest, NextResponse } from "next/server"

const errorMessage = "Video Id không chính xác"
const errorStatus = 400

export async function GET(req: NextRequest) {
  const videoId = req.nextUrl.searchParams.get("videoId")

  const transcript = await getYoutubeTranscript(videoId!)

  if (!transcript)
    return new NextResponse(errorMessage, {
      status: errorStatus,
    })
  return NextResponse.json({
    transcript,
  })
}
