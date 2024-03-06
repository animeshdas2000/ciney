import { z } from "zod"
import { procedure, router } from "../trpc"
import { Booking } from "../../lib/models/booking.model"
import { User } from "../../lib/models/user.model"

const bookingRouter = router({
  createBooking: procedure
    .input(
      z.object({
        booking_id: z.string(),
        seats: z.array(
          z.object({
            row: z.string() || z.number(),
            col: z.string() || z.number(),
          })
        ),
        movie_id: z.string(),
        show_time: z.string().datetime(),
      })
    )
    .mutation(async ({ input }) => {
      const booking_res = await Booking.create({
        booking_id: input.booking_id,
        seats: input.seats,
        movie_id: input.movie_id,
        show_time: input.show_time,
      })
      //TODO: Add logic for getting UserId from Token
      User.findOneAndUpdate(
        { _id: "65db916913cc53f83f1928c1" },
        { booking: booking_res._id }
      )

      return {
        success: true,
      }
    }),

  getBookingById: procedure
    .input(
      z.object({
        _id: z.string({
          required_error: "_id is required",
          invalid_type_error: "_id must be string",
        }),
      })
    )
    .query(async ({ input }) => {
      const { _id } = input
      const booking = await Booking.findById(_id)
      return {
        success: true,
        data: booking,
      }
    }),
})

export default bookingRouter
