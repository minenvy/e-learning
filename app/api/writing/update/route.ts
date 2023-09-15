import { connectToDb } from "@/app/lib/mongoose"
import Paragraph from "@/app/mongodb/paragraph.model"
import { NextRequest, NextResponse } from "next/server"

const message = "Cập nhật bài viết thành công"

export async function POST(req: NextRequest) {
  const { id, image, title, content } = await req.json()

  await connectToDb()

  const writing = await Paragraph.findById(id)
  
  writing.image = image
  writing.title = title
  writing.content = content
  writing.createdAt = new Date()
  writing.save()

  return NextResponse.json({
    message,
  })
}
