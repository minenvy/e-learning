import { connectToDb } from "@/app/lib/mongoose"
import Streak from "@/app/mongodb/streak.model"

export async function countMaxStreak(userId: string) {
  await connectToDb()

  const streak = await Streak.findOne({ userId })

  if (!streak) {
    await createStreakToDb(userId)
    return 0
  }
  return streak.maxStreak
}

export async function countNowStreak(userId: string) {
  await connectToDb()

  const streak = await Streak.findOne({ userId })

  if (!streak) {
    await createStreakToDb(userId)
    return 0
  }
  return streak.nowStreak
}

async function createStreakToDb(userId: string) {
  await connectToDb()

  const streak = new Streak({
    userId,
  })

  await streak.save()
}
