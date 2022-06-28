import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../lib/db";
import { Movies } from "../../../lib/models/movies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { movieId } = req.query;
  await connect();
  const movie = await Movies.findById(movieId).catch((err: Error) => {
    res.json(err);
  });
  res.json(movie);
}
