import WordType from "@/app/interfaces/word"
import { connectToDb } from "@/app/lib/mongoose"
import LevelWord from "@/app/mongodb/level-word.model"
import { getAuth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

const numberOfWordEachGet = 10

type Filter = {
  [key: string | number]: string | number
}

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req)

  await connectToDb()

  const { level, query, skip } = await req.json()

  const filter: Filter = {
    userId: userId!,
  }
  if (level !== 0) filter.level = level

  await import("@/app/mongodb/word.model")
  const levelWords = await LevelWord.find(filter).populate("word").exec()

  const words: WordType[] = []

  levelWords.forEach((levelWord) => {
    const word = levelWord.word
    if (word.enWord.includes(query)) words.push(word)
  })

  const data = words.slice(skip, skip + numberOfWordEachGet).map((word) => {
    return {
      enWord: word.enWord,
      type: word.type,
      definition: word.definition,
      example: word.example,
      synonyms: word.synonyms,
      antonyms: word.antonyms,
      image: word.image,
    }
  })

  return NextResponse.json(data)
}
