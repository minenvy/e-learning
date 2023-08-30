import User from "@/app/interfaces/user"
import { post } from "./fetch"

export async function signUpUser(user: User, warningMessage?: string) {
  return await post('/api/auth/signup', user, warningMessage)
}
