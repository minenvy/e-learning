export type Definitions = Array<{
  definition: string
  synonyms: Array<string>
  antonyms: Array<string>
  example?: string
}>

type DictionaryWord = Array<{
  meanings: Array<{
    partOfSpeech: string
    definitions: Definitions
  }>
  phonetic: string
  word: string
}>

export default DictionaryWord
