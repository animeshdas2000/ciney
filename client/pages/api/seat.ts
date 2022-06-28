import { NextApiRequest, NextApiResponse } from "next";
import { Movies } from "../../lib/models/movies";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id, row } = req.body;
    let arr: String[] = [];
    for (let j = 0; j <= row; j++) {
      for (let i = 65; i < 91; i++) {
        arr.push(`${String.fromCharCode(i)}${j}`);
      }
    }
    const movie = Movies.findByIdAndUpdate(id, { seats: {} }).catch((err) => {
      res.json(err);
    });
    res.json(movie);
  }
}
