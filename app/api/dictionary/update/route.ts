import Dictionary from "@/app/mongodb/dictionary.model"
import { getAuth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req)

  const { topic, count } = await req.json()

  const dictionary = await Dictionary.findOne({ userId })
  const dictionaryItem = dictionary.dictionary.find(
    (ele: any) => ele.type === topic,
  )

  if (!dictionaryItem) {
    dictionary.dictionary.push({
      type: topic,
      count,
    })
    await dictionary.save()
  } else {
    dictionary.dictionary = dictionary.dictionary.map((ele: any) => {
      if (ele.type === topic)
        return {
          type: topic,
          count,
        }
      return ele
    })
    await dictionary.save()
  }

  return NextResponse.json({
    updated: true,
  })
}
