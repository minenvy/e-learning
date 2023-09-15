import { wordApiLink } from "@/app/constants/word-api-link"
import DictionaryWord from "@/app/interfaces/dictionary-word"
import { get } from "./fetch"

export async function getWordInfoFromOtherApi(word: string) {
  const res = await fetch(wordApiLink + word)
  const data = await res.json()

  if (data?.message) return null

  const wordData = data as DictionaryWord
  const firstWord = wordData[0]
  const meaning = firstWord.meanings[0]
  const definition = meaning.definitions[0]
  return {
    enWord: firstWord.word,
    type: meaning.partOfSpeech,
    definition: definition.definition,
    synonyms: definition.synonyms.join(", "),
    antonyms: definition.antonyms.join(", "),
    example: definition?.example || "",
    phonetic: firstWord.phonetic,
  }
}

export async function getWordInfoFromServerApi(word: string) {
  return await get("/api/word/get-info", { word })
}
