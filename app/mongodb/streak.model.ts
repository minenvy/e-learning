import mongoose from "mongoose"

const streakSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  maxStreak: {
    type: Number,
    default: 0,
  },
  nowStreak: {
    type: Number,
    default: 0,
  },
  isLearnedToday: {
    type: Boolean,
    default: false,
  },
})

const Streak = mongoose.models?.Streak || mongoose.model("Streak", streakSchema)

export default Streak
