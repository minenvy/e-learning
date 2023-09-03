import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  onboarding: {
    type: Boolean,
    default: false,
  },
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User
