import mongoose from "mongoose"

let isConnected = false

export async function connectToDb() {
  mongoose.set("strictQuery", true)

  if (!process.env.MONGODB_URL) return console.log("Database URL is empty!")

  if (isConnected) {
    console.log("Database already connected!")
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL)

    isConnected = true
    console.log("Database connect successful!")
  } catch (error) {
    console.log(`Fail to connect database: ${error}`)
  }
}
