import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../lib/db";
import { Movies } from "../../../lib/models/movies";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();
  const movies = await Movies.find({}).catch((err: Error) => {
    res.json(err);
  });
  res.json(movies);
  // if (req.method === "POST") {
  //   const postMovies = await Movies.create(req.body).catch((err: Error) => {
  //     res.json(err);
  //   });
  //   res.json(postMovies);
  // }
}
