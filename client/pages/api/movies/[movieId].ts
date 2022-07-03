import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../lib/db";
import { Movies } from "../../../lib/models/movies";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: string = req.query.movieId as string;
  await connect();
  // const movie = await
  // Movies.findById(movieId)
  //   .then((val) => {
  //     res.json(val);
  //   })
  //   .catch((err: Error) => {
  //     res.json(err);
  //   });
  // res.json("Hello", movieId);
  // if (movie.seats.length !== 0) {
  //   res.json(movie);
  // } else {
  //   res.json("Booking Unavailable");
  // }
  // res.json(movie);
  // res.json(movie);

  const movie = await Movies.findById(id).catch((err) => {
    res.json({ err });
  });
  res.json(movie);
  res.end();
}
