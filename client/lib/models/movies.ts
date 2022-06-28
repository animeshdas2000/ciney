import mongoose from "mongoose";
// OUR TODO SCHEMA
const MoviesSchema = new mongoose.Schema({
  movie_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  seats: [
    {
      seat_num: {
        type: String,
        required: true,
      },
      isBooked: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

// OUR TODO MODEL
export const Movies =
  mongoose.models.Movies || mongoose.model("Movies", MoviesSchema);
