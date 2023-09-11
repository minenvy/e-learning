import Word from "@/app/interfaces/word"
import { post } from "./fetch"

export async function addNewWord(word: Word) {
  const warningMessage = "Cần điền đầy đủ thông tin cần thiết"
  return await post("/api/word/new", word, warningMessage)
}
