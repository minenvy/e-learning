import mongoose, { Schema } from "mongoose"

const levelWordSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  word: {
    type: Schema.Types.ObjectId,
    ref: "word",
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  lastLearnedAt: {
    type: Date,
    default: Date.now,
  },
  forgotLevel: {
    type: Number,
    default: 0,
  },
})

const LevelWord =
  mongoose.models["level word"] || mongoose.model("level word", levelWordSchema)

export default LevelWord
