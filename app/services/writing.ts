import Paragraph from "@/app/interfaces/paragraph"
import { get, post } from "./fetch"

export async function getWritings(filter: string, skip: number) {
  return await get("/api/writings/get-info", { query: filter, skip })
}

export async function getWriting(id: string) {
  return await get("/api/writing/get-info", { id })
}

export async function addWriting(writing: Paragraph) {
  return await post("/api/writing/new", { ...writing })
}

export async function updateWriting(writing: Paragraph) {
  return await post("/api/writing/update", { ...writing })
}

export async function deleteWriting(id: string) {
  await post("/api/writing/delete", { id })
}
