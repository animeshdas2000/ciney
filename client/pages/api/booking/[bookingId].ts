import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../lib/db";
import { Ticket } from "../../../lib/models/ticket";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { bookingId } = req.query;
  await connect();
  switch (req.method) {
    case "GET":
      const booking = await Ticket.findById(bookingId).catch((err: Error) => {
        res.json(err);
      });
      res.json(booking);
      break;
    default:
      break;
  }
  res.end();
}
