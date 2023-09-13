import Word from "@/app/mongodb/word.model"
import { NextRequest, NextResponse } from "next/server"
import { getAuth } from "@clerk/nextjs/server"
import LevelWord from "@/app/mongodb/level-word.model"
import { connectToDb } from "@/app/lib/mongoose"

const initForgotLevel = 0
const maxLevel = 7

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req)

  await connectToDb()

  const body = await req.json()

  body.forEach(async (word: string) => {
    await updateLevel(userId!, word)
  })

  return NextResponse.json({
    message: "Cập nhật thành công",
  })
}

async function updateLevel(userId: string, enWord: string) {
  await connectToDb()

  const word = await Word.findOne({ userId, enWord })

  const wordId = word._id

  const levelWord = await LevelWord.findOne({ userId, word: wordId })
  levelWord.forgotLevel = initForgotLevel
  const level = levelWord.level
  if (level < maxLevel) {
    levelWord.level = level + 1
  }

  await levelWord.save()
}
