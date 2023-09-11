import mongoose from "mongoose"

const dictionarySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
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
  mongoose.models["dictionary"] ||
  mongoose.model("dictionary", dictionarySchema)

export default Dictionary
