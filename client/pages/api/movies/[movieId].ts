import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../lib/db"
import { Movies } from "../../../lib/models/movies"
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: string = req.query.movieId as string
  switch (req.method) {
    case "GET":
      {
        await connect()
        const movie = await Movies.findById(id).catch((err: Error) => {
          res.json({ err })
        })
        res.json(movie)
      }
      break
    default:
      break
  }
  res.end()
}
