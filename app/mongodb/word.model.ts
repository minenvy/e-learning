import mongoose from "mongoose"

const wordSchema = new mongoose.Schema({
  enVersion: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  explainMeaning: {
    type: String
  },
  example: {
    type: String
  },
  synonym: {
    type: String
  },
  image: {
    type: String
  },
  vieVersion: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

const Word = mongoose.models.Word || mongoose.model('word', wordSchema)

export default Word
