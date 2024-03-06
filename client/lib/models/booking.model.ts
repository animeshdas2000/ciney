import mongoose, { model, Schema } from "mongoose"
import { ISeat } from "./seat"
import { IUser } from "./user.model"

export interface IBooking {
  booking_id: string
  seats: ISeat[]
  movie_id: string
  show_time: Date
}

const bookingSchema = new Schema<IBooking>({
  booking_id: {
    type: String,
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
  movie_id: {
    type: String,
  },
  show_time: {
    type: Date,
    required: true,
  },
})

export const Booking =
  mongoose.models.Booking || model("Booking", bookingSchema)
