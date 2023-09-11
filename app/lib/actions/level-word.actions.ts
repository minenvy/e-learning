import { connectToDb } from "@/app/lib/mongoose"
import LevelTime from "@/app/mongodb/level-time.model"
import LevelWord from "@/app/mongodb/level-word.model"
import { minusTwoDatesInMilliseconds } from "@/app/lib/utils/minus-two-dates"

const maxLevel = 7
const defaultLevelWord = Array(maxLevel + 1).fill(0)

export async function getCountWordForAllLevel(userId: string) {
  await connectToDb()

  const allLevelWord = await LevelWord.find({ userId }).exec()

  const numberOfEachLevel = defaultLevelWord

  if (!allLevelWord) return numberOfEachLevel
  allLevelWord.forEach((levelWord) => {
    numberOfEachLevel[levelWord.level]++
  })

  return numberOfEachLevel.shift()
}

export async function countLearnedWord(userId: string) {
  await connectToDb()

  const allLevelWord = await LevelWord.find({ userId }).exec()

  if (!allLevelWord) return 0
  return allLevelWord.length
}

export async function countFamiliarWord(userId: string) {
  await connectToDb()

  const allLevelWord = await LevelWord.find({ userId }).exec()

  if (!allLevelWord) return 0
  return allLevelWord.filter((word) => word.level === maxLevel).length
}

export async function countReviewWord(userId: string) {
  await connectToDb()

  const allLevelWord = await LevelWord.find({ userId }).exec()

  if (!allLevelWord) return 0

  const allLevelTime = await LevelTime.find()
  let count = 0
  allLevelWord.forEach((word) => {
    if (word.forgotLevel > 0) {
      const timeToReview = allLevelTime.find(
        (ele) => ele.level == word.forgotLevel,
      ).time
      if (minusTwoDatesInMilliseconds(word.lastLearnedAt) > timeToReview)
        count++
    } else {
    }
  })

  return count
}
