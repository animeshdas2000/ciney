import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../lib/db";
import { Movies } from "../../../lib/models/movies";
import { generateSeatLayout } from "../../../lib/seatLayout";
//import { seatLayout } from "../../../lib/seatLayout";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();

  switch (req.method) {
    case "GET":
      {
        const movies = await Movies.find({}).catch((err: Error) => {
          res.json(err);
        });
        res.json(movies);
      }
      break;
    case "POST":
      {
        const { movie_id, name, duration } = req.body;
        const seatLayout = generateSeatLayout();
        // console.log(seatLayout);
        const postMovies = await Movies.create({
          movie_id,
          name,
          duration,
          seats: seatLayout,
        }).catch((err: Error) => {
          res.json(err);
        });
        res.json(postMovies);
      }
      break;
    default:
      break;
  }
}
