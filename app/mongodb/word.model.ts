import mongoose from "mongoose"

const wordSchema = new mongoose.Schema({
  enWord: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  definition: {
    type: String,
    required: true,
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
})

const Word = mongoose.models["word"] || mongoose.model("word", wordSchema)

export default Word
