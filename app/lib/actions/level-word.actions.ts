import { connectToDb } from "@/app/lib/mongoose"
import LevelTime from "@/app/mongodb/level-time.model"
import LevelWord from "@/app/mongodb/level-word.model"
import { minusTwoDatesInMilliseconds } from "@/app/lib/utils/minus-two-dates"
import ForgotLevel from "@/app/mongodb/forgot-level.model"
import Word from "@/app/interfaces/word"
import LevelWordType from "@/app/interfaces/level-word"

const maxLevel = 7
const defaultLevelWord = Array(maxLevel).fill(0)

export async function getCountWordForAllLevel(userId: string) {
  await connectToDb()

  const allLevelWord = await LevelWord.find({ userId })

  const numberOfEachLevel = defaultLevelWord

  if (!allLevelWord) return numberOfEachLevel
  allLevelWord.forEach((levelWord) => {
    numberOfEachLevel[levelWord.level - 1]++
  })

  return numberOfEachLevel
}

export async function countLearnedWord(userId: string) {
  await connectToDb()

  const allLevelWord = await LevelWord.find({ userId })

  if (!allLevelWord) return 0
  return allLevelWord.length
}

export async function countFamiliarWord(userId: string) {
  await connectToDb()

  const allLevelWord = await LevelWord.find({ userId })

  if (!allLevelWord) return 0
  return allLevelWord.filter((word) => word.level === maxLevel).length
}

export async function countReviewWord(userId: string) {
  await connectToDb()

  const allLevelWord = await LevelWord.find({ userId })

  if (!allLevelWord) return 0

  const allLevelForgotTime = await ForgotLevel.find()
  const allLevelReviewTime = await LevelTime.find()
  let count = 0
  allLevelWord.forEach((word) => {
    if (Number(word.forgotLevel) > 0) {
      const timeToReview = allLevelForgotTime.find(
        (ele) => ele.level == word.forgotLevel,
      ).time
      if (minusTwoDatesInMilliseconds(word.lastLearnedAt) > timeToReview)
        count++
    } else {
      const timeToReview = allLevelReviewTime.find(
        (ele) => ele.level == word.level,
      ).time
      if (minusTwoDatesInMilliseconds(word.lastLearnedAt) > timeToReview)
        count++
    }
  })

  return count
}

export async function getAllNeedReviewWord(userId: string) {
  await connectToDb()

  const allLevelWord = (await LevelWord.find({ userId })
    .populate("word")
    .exec()) as LevelWordType[]

  if (!allLevelWord) return []

  const allLevelForgotTime = await ForgotLevel.find()
  const allLevelReviewTime = await LevelTime.find()
  let needReviewWords: Array<Word> = []
  allLevelWord.forEach((word) => {
    if (Number(word.forgotLevel) > 0) {
      const timeToReview = allLevelForgotTime.find(
        (ele) => ele.level == word.forgotLevel,
      ).time
      if (minusTwoDatesInMilliseconds(word.lastLearnedAt) > timeToReview)
        needReviewWords.push(word.word)
    } else {
      const timeToReview = allLevelReviewTime.find(
        (ele) => ele.level == word.level,
      ).time
      if (minusTwoDatesInMilliseconds(word.lastLearnedAt) > timeToReview)
        needReviewWords.push(word.word)
    }
  })

  return needReviewWords.map((word) => {
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
}
