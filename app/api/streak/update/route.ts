import { connectToDb } from "@/app/lib/mongoose"
import Streak from "@/app/mongodb/streak.model"
import { getAuth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req)

  await connectToDb()

  const streak = await Streak.findOne({ userId })
  streak.isLearnedToday = true

  await streak.save()

  return NextResponse.json({
    message: "Cập nhật thành công",
  })
}
