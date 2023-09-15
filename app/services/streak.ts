import { post } from "./fetch"

export async function updateStreak() {
  return await post("/api/streak/update")
}
