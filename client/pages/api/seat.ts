import { NextApiRequest, NextApiResponse } from "next";
import { Movies } from "../../lib/models/movies";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id, row } = req.body;
    let arr: Array<{ row: string; col: number }> = [];
    for (let j = 0; j <= row; j++) {
      for (let i = 65; i < 91; i++) {
        arr.push({ row: `${String.fromCharCode(i)}`, col: j });
      }
    }
    const movie = Movies.findByIdAndUpdate(id, { seats: {} }).catch((err) => {
      res.json(err);
    });
    res.json(movie);
  }
}
