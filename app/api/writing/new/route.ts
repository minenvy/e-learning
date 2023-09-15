import { connectToDb } from "@/app/lib/mongoose"
import Paragraph from "@/app/mongodb/paragraph.model"
import { getAuth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

const message = "Thêm bài viết thành công"

export async function POST(req: NextRequest) {
  const { image, title, content } = await req.json()
  const { userId } = getAuth(req)

  await connectToDb()

  const writing = new Paragraph({ userId, image, title, content })
  writing.save()

  return NextResponse.json({
    message,
  })
}
