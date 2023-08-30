import UserModel from '@/app/mongodb/user.model'
import { NextRequest, NextResponse } from 'next/server'

type Body = {
  name: string
  username: string
  image?: string
}

export async function POST(req: NextRequest) {
  const { name, username, image } = (await req.json()) as Body

  await UserModel.findOneAndUpdate(
    { username },
    {
      name,
      image,
      onboarding: true,
    }
  )

  return NextResponse.json({
    message: 'Cập nhật thông tin thành công',
  })
}
