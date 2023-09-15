import mongoose from "mongoose"

const forgotLevelSchema = new mongoose.Schema({
  level: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
})

const ForgotLevel =
  mongoose.models?.ForgotLevel ||
  mongoose.model("ForgotLevel", forgotLevelSchema)

export default ForgotLevel
