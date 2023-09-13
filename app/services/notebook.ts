import { get } from "./fetch"

export async function getWordForNoteBook(
  level: number,
  query: string,
  skip: number,
) {
  return await get("/api/words/get-all", { level, query, skip })
}
