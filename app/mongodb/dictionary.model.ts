import mongoose from "mongoose"

const dictionarySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  dictionary: [
    {
      type: {
        type: String,
        required: true,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  ],
})

const Dictionary =
  mongoose.models?.Dictionary || mongoose.model("Dictionary", dictionarySchema)

export default Dictionary
