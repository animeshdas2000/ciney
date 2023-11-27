import mongose, { model, Schema } from "mongoose"

interface IUser {
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
  return mongose.models && mongose.models.User
    ? mongose.models.User
    : model<IUser>("User", userSchema)
}

export default userModel

