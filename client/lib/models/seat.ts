import mongoose from "mongoose"

export interface ISeat {
  row: string | number
  col: string | number
  status: "BOOKED" | "HOLD" | "AVAILABLE"
}

const seatSchema = new mongoose.Schema({
  // id: {
  //   type: String,
  //   required: true,
  // },
  seat_num: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    required: true,
  },
})

export const Seat = mongoose.models.Seat || mongoose.model("Seat", seatSchema)
