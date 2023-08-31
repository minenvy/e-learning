import { addUserFromCredentials, getUserByUsername } from "@/app/lib/actions/user.actions"
import { NextResponse, NextRequest } from "next/server"

const errorMessage = 'Tài khoản đã tồn tại'
const errorStatus = 400

type Body = {
  username: string
  password: string
}

export async function POST(req: NextRequest) {
  const { username, password } = await req.json() as Body

  const user = await getUserByUsername(username)

  if (user) return new NextResponse(errorMessage, {
    status: errorStatus,
  })

  await addUserFromCredentials({ username, password })

  return NextResponse.json({
    user: { username, password },
    message: 'Đăng ký thành công'
  })
}
