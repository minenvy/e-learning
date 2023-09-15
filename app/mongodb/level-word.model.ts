import mongoose from "mongoose"

const levelWordSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  word: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Word",
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
  mongoose.models?.LevelWord || mongoose.model("LevelWord", levelWordSchema)

export default LevelWord
