import mongoose from "mongoose";
// OUR TODO SCHEMA
const MoviesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

// OUR TODO MODEL
export const Movies =
  mongoose.models.Movies || mongoose.model("Movies", MoviesSchema);
