import User from '@/app/interfaces/user'
import { connectToDb } from '@/app/lib/mongoose'
import UserModel from '@/app/mongodb/user.model'
import bcrypt from 'bcrypt'

export async function getUserByUsername(
  username: string
): Promise<User | null> {
  await connectToDb()
  return await UserModel.findOne({ username })
}

export async function addUserFromCredentials(user: User) {
  await connectToDb()
  const hashedUser = user
  const hashedPassword = await bcrypt.hash(
    hashedUser.password as string,
    12
  )
  hashedUser.password = hashedPassword
  const newUser = new UserModel(hashedUser)
  await newUser.save()
}

export async function addUserFromGoogle(user: User) {
  await connectToDb()
  const newUser = new UserModel({ ...user, onboarding: true })
  await newUser.save()
}
