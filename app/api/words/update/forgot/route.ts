import Word from "@/app/mongodb/word.model"
import { NextRequest, NextResponse } from "next/server"
import { getAuth } from "@clerk/nextjs/server"
import LevelWord from "@/app/mongodb/level-word.model"
import { connectToDb } from "@/app/lib/mongoose"

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req)

  await connectToDb()

  const body = await req.json()

  body.forEach(async (word: string) => {
    await updateForgotLevel(userId!, word)
  })

  return NextResponse.json({
    message: "Cập nhật thành công",
  })
}

async function updateForgotLevel(userId: string, enWord: string) {
  await connectToDb()

  const word = await Word.findOne({ userId, enWord })

  const wordId = word._id

  const levelWord = await LevelWord.findOne({ userId, word: wordId })
  const levelForgot = levelWord.forgotLevel
  if (levelForgot < 3) {
    levelWord.forgotLevel = levelForgot + 1
    await levelWord.save()
  }
}
