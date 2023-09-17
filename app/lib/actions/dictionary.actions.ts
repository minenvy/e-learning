import DictionaryType from "@/app/interfaces/dictionary"
import { connectToDb } from "@/app/lib/mongoose"
import Dictionary from "@/app/mongodb/dictionary.model"
import fs from "fs"

const defaultDictionary: DictionaryType = []
const numberOfWordEachLearn = 10
const dataFolder = "./app/data/"

export async function getCountEachTopic(
  userId: string,
): Promise<DictionaryType> {
  await connectToDb()

  const dictionary = await Dictionary.findOne({ userId })

  if (!dictionary) {
    await createDictionary(userId)
    return defaultDictionary
  }
  return dictionary.dictionary.map((topic: any) => {
    return {
      type: topic.type,
      count: topic.count,
    }
  })
}

export async function getNextTenWords(topic: string, learnedCount: number) {
  await connectToDb()

  const dictionary = JSON.parse(
    fs.readFileSync(`${dataFolder}${topic}.json`).toString(),
  )

  return dictionary.slice(learnedCount, learnedCount + numberOfWordEachLearn)
}

async function createDictionary(userId: string) {
  await connectToDb()

  const newDictionary = new Dictionary({ userId, dictionary: [] })

  await newDictionary.save()
}
