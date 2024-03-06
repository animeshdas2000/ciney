import mongoose, { Model, model, models, Schema } from "mongoose"
import { IBooking } from "./booking.model"

export interface IUser {
  name: string
  email: string
  image?: string
  booking?: IBooking[]
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  booking: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: false,
    },
  ],
})

export const User = mongoose.models.User || model("User", UserSchema)
