import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;
const ticketSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    movie: {
      type: ObjectId,
      ref: "movies",
      required: true,
    },
    seat: {
      type: ObjectId,
      ref: "Seat",
      required: true,
    },
    time: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Ticket =
  mongoose.models.Tickets || mongoose.model("Tickets", ticketSchema);
