const lengthWord = 5
const regex = /^[A-Za-z]+$/

export function getWordsToListen(transcript: string): string[] {
  const words = transcript.split(" ")

  const longWords = Array.from(new Set(words))
    .filter((word) => word.length >= lengthWord)
    .filter((word) => regex.test(word))

  const numberOfWords = Math.floor(Math.random() * 10 + 20)
  if (longWords.length <= numberOfWords) return longWords

  const set = new Set()
  while (set.size < numberOfWords) {
    const index = Math.floor(Math.random() * longWords.length)
    set.add(longWords[index])
  }

  return Array.from(set) as string[]
}
