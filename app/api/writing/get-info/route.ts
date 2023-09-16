import { connectToDb } from "@/app/lib/mongoose"
import Paragraph from "@/app/mongodb/paragraph.model"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { id } = await req.json()

  await connectToDb()

  const writing = await Paragraph.findById(id)

  return NextResponse.json({
    id: writing._id.toString(),
    image: writing.image,
    title: writing.title,
    content: writing.content,
    createdAt: writing.createdAt,
  })
}
