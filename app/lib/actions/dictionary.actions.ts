import DictionaryType from "@/app/interfaces/dictionary"
import { connectToDb } from "@/app/lib/mongoose"
import Dictionary from "@/app/mongodb/dictionary.model"

const defaultDictionary: DictionaryType = []
const numberOfWordEachLearn = 10

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

  const dictionary = await import(`@/app/data/${topic}.json`).then(
    (module) => module.default,
  )

  return dictionary.slice(learnedCount, learnedCount + numberOfWordEachLearn)
}

async function createDictionary(userId: string) {
  await connectToDb()

  const newDictionary = new Dictionary({ userId, dictionary: [] })

  await newDictionary.save()
}
