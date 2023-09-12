import { post } from "./fetch"

export async function updateLearnedWordCountInTopic(
  topic: string,
  count: number,
) {
  await post("/api/dictionary/update", { topic, count })
}
