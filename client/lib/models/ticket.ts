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
      // type: String,
      type: ObjectId,
      ref: "movies",
      required: true,
    },
    seats: [
      {
        row: {
          type: String,
          required: true,
        },
        col: {
          type: Number,
          required: true,
        },
        isBooked: {
          type: String,
          required: true,
        },
        _id: {
          type: ObjectId,
          required: true,
        },
      },
    ],
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
