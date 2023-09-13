import Word from "@/app/mongodb/word.model"
import { NextRequest, NextResponse } from "next/server"
import { getAuth } from "@clerk/nextjs/server"
import LevelWord from "@/app/mongodb/level-word.model"
import WordType from "@/app/interfaces/word"
import { connectToDb } from "@/app/lib/mongoose"

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req)

  await connectToDb()

  const body = await req.json()

  body.forEach(async (word: WordType) => {
    await addToDb(userId!, word)
  })

  return NextResponse.json({
    message: "Thêm từ mới thành công",
  })
}

async function addToDb(userId: string, word: WordType) {
  await connectToDb()
  
  const { enWord, type, definition, synonyms, antonyms, example, image } = word
  const newWord = new Word({
    userId,
    enWord,
    type,
    definition,
    synonyms,
    antonyms,
    example,
    image,
  })
  const wordInDb = await newWord.save()

  const newLevelWord = new LevelWord({
    userId,
    word: wordInDb._id,
    level: 1,
  })
  await newLevelWord.save()
}
