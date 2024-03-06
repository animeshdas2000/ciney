import { z } from "zod"
import { procedure, router } from "../trpc"
import userRouter from "./user.router"
import moviesRouter from "./movies.router"
import bookingRouter from "./booking.router"

export const appRouter = router({
  user: userRouter,
  movies: moviesRouter,
  booking: bookingRouter,
})

export type AppRouter = typeof appRouter
