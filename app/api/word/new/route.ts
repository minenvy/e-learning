import Word from "@/app/mongodb/word.model"
import { NextRequest, NextResponse } from "next/server"
import { getAuth } from "@clerk/nextjs/server"
import LevelWord from "@/app/mongodb/level-word.model"

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req)
  const {
    enWord,
    type,
    vieWord,
    definition,
    synonyms,
    antonyms,
    example,
    image,
  } = await req.json()

  const newWord = new Word({
    userId,
    enWord,
    type,
    vieWord,
    definition,
    synonyms,
    antonyms,
    example,
    image,
    isUserAdded: true,
  })
  const wordInDb = await newWord.save()

  const newLevelWord = new LevelWord({
    userId,
    word: wordInDb._id,
    level: 1,
  })
  await newLevelWord.save()

  return NextResponse.json({
    message: "Thêm từ mới thành công",
  })
}
