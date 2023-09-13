import mongoose from "mongoose"

const levelTimeSchema = new mongoose.Schema({
  level: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
})

const LevelTime =
  mongoose.models["LevelTime"] || mongoose.model("LevelTime", levelTimeSchema)

export default LevelTime
