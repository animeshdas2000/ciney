import mongoose from "mongoose";
// OUR TODO SCHEMA
interface IMovie {
  movie_id:string,
  name:string,
  duration: number,
  seats: ISeats[],
}

interface ISeats{
  row: string | number,
  col: string | number,
  isBooked: boolean

}

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
      row: {
        type: String || Number,
        required: true,
      },
      col: {
        type: String || Number,
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
