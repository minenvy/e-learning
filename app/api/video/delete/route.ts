import { connectToDb } from "@/app/lib/mongoose"
import Video from "@/app/mongodb/video.model"
import { NextRequest, NextResponse } from "next/server"

const message = "Xóa thành công"

export async function POST(req: NextRequest) {
  const { id } = await req.json()

  await connectToDb()

  await Video.findByIdAndDelete(id)

  return NextResponse.json({
    message,
  })
}
