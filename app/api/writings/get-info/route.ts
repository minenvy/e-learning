import { connectToDb } from "@/app/lib/mongoose"
import Paragraph from "@/app/mongodb/paragraph.model"
import { getAuth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

const maxNumberOfWritingEachGet = 10

export async function POST(req: NextRequest) {
  const { query, skip } = await req.json()

  const { userId } = getAuth(req)

  await connectToDb()

  const writings = await Paragraph.find({ userId })
  const data = writings
    .filter((writing) =>
      writing.title.toLowerCase().includes(query.toLowerCase()),
    )
    .slice(skip, skip + maxNumberOfWritingEachGet)
    .map((writing) => {
      return {
        id: writing._id.toString(),
        title: writing.title,
        image: writing.image,
        content: writing.content,
        createdAt: writing.createdAt,
      }
    })

  return NextResponse.json(data)
}
