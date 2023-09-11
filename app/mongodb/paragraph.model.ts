import mongoose from "mongoose"

const paragraphSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Paragraph =
  mongoose.models["paragraph"] || mongoose.model("paragraph", paragraphSchema)

export default Paragraph
