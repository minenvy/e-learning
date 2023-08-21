import { connectToDb } from "@/app/lib/mongoose";

export async function getUser(username: string) {
  await connectToDb()

  
}