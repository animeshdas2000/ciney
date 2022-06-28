import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../lib/db";
import { Movies } from "../../../lib/models/movies";
import seat from "../seat";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { movieId } = req.query;
  await connect();
  const movie = await Movies.findById(movieId).catch((err: Error) => {
    res.json(err);
  });
  if (movie.seats.length === 0) {
    res.json("Booking Unavailable");
  } else {
    res.json(movie);
  }
  // res.json(movie);
  res.end();
}
