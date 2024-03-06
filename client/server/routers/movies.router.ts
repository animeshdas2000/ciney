import { z } from "zod"
import { procedure, router } from "../trpc"
import { Movies } from "../../lib/models/movies"

const moviesRouter = router({
  createMovie: procedure
    .input(
      z.object({
        movie_id: z.string(),
        name: z.string(),
        duration: z.number(),
        image_url: z.string(),
        show_time: z.array(z.string().datetime()),
      })
    )
    .mutation(async ({ input }) => {
      await Movies.create({
        name: input.name,
        movie_id: input.name,
        duration: input.duration,
        image_url: input.image_url,
        show_time: input.show_time,
      })

      return {
        success: true,
        message: "Movie Created Successfully",
      }
    }),
  getMovies: procedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(),
      })
    )
    .query(async (opts) => {
      const { input } = opts
      const limit = input.limit ?? 50
      const { cursor } = input

      const movies = await Movies.find()
        .sort("-1")
        .limit(limit + 1)
        .skip(cursor ?? 0)
        .exec()

      let nextCursor: typeof cursor | undefined = undefined
      if (movies.length > limit) {
        const nextMovie = movies.pop()
        nextCursor = nextMovie!.myCursor
      }
      return {
        success: true,
        data: movies,
        nextCursor,
      }
    }),

  getMovieByID: procedure
    .input(z.object({ _id: z.string() }))
    .query(async (opts) => {
      const movie = await Movies.findById(opts.input._id)
      return {
        success: true,
        data: movie,
      }
    }),
})

export default moviesRouter
