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

export async function addUser(user: User) {
	await connectToDb()
	const newUser = user
	newUser.password = (await bcrypt.hash(
		newUser.password as string,
		12
	)) as string
	const newUserDb = new UserModel(newUser)
	await newUserDb.save()
}
