import { z } from "zod"
import userModel, { IUser } from "../../lib/models/user.model"
import { procedure, router } from "../trpc"

const userRouter = router({
  setUser: procedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const userModelData = await userModel().create({
        name: input.name,
        email: input.email,
        avatar: "https://hello.img",
      })

      return {
        success: true,
        message: "User Created Successfully",
      }
    }),

  getUser: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const userModelData = await userModel().findById({
        _id: input.id,
      })
      return {
        success: true,
        userData: userModelData as IUser,
      }
    }),
})

export default userRouter
