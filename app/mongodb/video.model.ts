import mongoose from "mongoose"

const videoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  youtubeVideoId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Video = mongoose.models["video"] || mongoose.model("video", videoSchema)

export default Video
