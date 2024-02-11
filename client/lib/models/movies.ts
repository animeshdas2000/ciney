import mongoose from "mongoose"
export interface IMovie {
  movie_id: string
  name: string
  duration: number
  show_time: Date[]
  image_url: string
  seats: ISeats[]
}

interface ISeats {
  row: string | number
  col: string | number
  status: "BOOKED" | "HOLD" | "AVAILABLE"
}

const MoviesSchema = new mongoose.Schema(
  {
    movie_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, //in minutes
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
        status: {
          type: String,
          enum: ["BOOKED", "HOLD", "AVAILABLE"],
          default: "AVAILABLE",
        },
      },
    ],
    image_url: {
      type: String,
      required: true,
    },
    show_time: [
      {
        type: Date,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
)

// OUR TODO MODEL
export const Movies =
  mongoose.models.Movies || mongoose.model("Movies", MoviesSchema)
