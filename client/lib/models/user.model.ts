import { Model, model, models, Schema } from "mongoose"

export interface IUser {
  name: string
  email: string
  avatar?: string
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
})

const userModel = () => {
  return (models.User as Model<IUser>) || model("User", userSchema)
}

export default userModel
