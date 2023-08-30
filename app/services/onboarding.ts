import { post } from "./fetch"

type UpdateInfoUser = {
  name: string
  username: string
  image?: string
}

export async function updateUserInfo(user: UpdateInfoUser) {
  return await post('/api/auth/onboarding', user)
}
