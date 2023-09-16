import { connectToDb } from "@/app/lib/mongoose"
import Paragraph from "@/app/mongodb/paragraph.model"
import { NextRequest, NextResponse } from "next/server"

const message = "Xóa bài viết thành công"

export async function POST(req: NextRequest) {
  const { id } = await req.json()

  await connectToDb()

  await Paragraph.findByIdAndDelete(id)

  return NextResponse.json({
    message,
  })
}
