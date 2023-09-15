import { connectToDb } from "@/app/lib/mongoose"
import Paragraph from "@/app/mongodb/paragraph.model"

export async function getWriting(id: string) {
  await connectToDb()

  const writing = await Paragraph.findById(id)

  return {
    id: writing._id.toString(),
    image: writing.image,
    title: writing.title,
    content: writing.content,
    createdAt: writing.createdAt,
  }
}
