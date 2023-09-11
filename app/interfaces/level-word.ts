import Word from "./word"

export default interface LevelWord {
  userId: string
  word: Word
  level: number
  lastLearnedAt: Date
  forgotLevel: number
}
