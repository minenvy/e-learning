import Word from "@/app/interfaces/word"
import { post } from "./fetch"

export async function updateToMaxLevel(words: string[]) {
  return await post("/api/words/update/max-level", words)
}

export async function updateForgotLevel(words: string[]) {
  return await post("/api/words/update/forgot", words)
}

export async function updateLevel(words: string[]) {
  return await post("/api/words/update/pass", words)
}
