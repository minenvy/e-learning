import mongoose from "mongoose"

const wordSchema = new mongoose.Schema({
  enWord: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  definition: {
    type: String,
  },
  example: {
    type: String,
  },
  synonyms: {
    type: String,
  },
  antonyms: {
    type: String,
  },
  image: {
    type: String,
  },
  vieWord: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Word = mongoose.models["word"] || mongoose.model("word", wordSchema)

export default Word
