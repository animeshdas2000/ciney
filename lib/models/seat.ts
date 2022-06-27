import mongoose from "mongoose";

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
});

export const Seat = mongoose.models.Seat || mongoose.model("Seat", seatSchema);
