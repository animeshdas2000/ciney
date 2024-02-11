import { z } from "zod"
import { procedure, router } from "../trpc"
import userRouter from "./user.router"
import moviesRouter from "./movies.router"

export const appRouter = router({
  user: userRouter,
  movies: moviesRouter,
})

export type AppRouter = typeof appRouter
