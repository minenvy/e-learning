import { connectToDb } from "@/app/lib/mongoose"
import LevelWord from "@/app/mongodb/level-word.model"
import { getAuth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { word } = await req.json()
  const { userId } = getAuth(req)

  connectToDb()

  import("@/app/mongodb/word.model")
  const levelWords = await LevelWord.find({ userId }).populate("word").exec()

  const levelWordInfo = levelWords.find((w) => w.word.enWord === word)

  if (!levelWordInfo) return NextResponse.json({})

  const wordInfo = levelWordInfo.word
  const data = {
    enWord: wordInfo.enWord,
    type: wordInfo.type,
    definition: wordInfo.definition,
    example: wordInfo.example,
    synonyms: wordInfo.synonyms,
    antonyms: wordInfo.antonyms,
    image: wordInfo.image,
  }

  return NextResponse.json(data)
}
