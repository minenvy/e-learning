import Word from "@/app/interfaces/word"
import { post } from "./fetch"

export async function addNewWord(word: Word) {
  const warningMessage = "Cần điền đầy đủ thông tin cần thiết"
  return await post("/api/word/new", word, warningMessage)
}

export async function addMaxLevelWord(word: Word) {
  return await post("/api/word/max-level", word)
}

export async function addNewWords(words: Word[]) {
  const warningMessage = "Cần điền đầy đủ thông tin cần thiết"
  return await post("/api/words/new", words, warningMessage)
}

export async function addMaxLevelWords(words: Word[]) {
  return await post("/api/words/max-level", words)
}
