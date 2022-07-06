import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../lib/db";
import { ResponseFn } from "../../../lib/types";
import { Ticket } from "../../../lib/models/ticket";
import { Seat } from "../../../lib/models/seat";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const catcher = (error: Error) => {
    return res.json({ error });
  };
  await connect();

  switch (req.method) {
    case "GET":
      {
        const ticket = await Ticket.find({}).catch(catcher);
        // console.log(ticket);
        res.status(200).json(ticket);
      }
      break;
    case "POST":
      {
        const { id, name, movie } = req.body;

        // const seat_id = "62b8bbc05ce851d229541dd8";
        const seat_id = "62b97c3138960e083c7a3b4e";
        const seat_obj = await Seat.findById(seat_id).catch(catcher);
        // console.log(seat_obj);
        const newBooking = await new Ticket({
          id,
          name,
          movie,
          seat: seat_obj,
        });
        res.json(await Ticket.create(newBooking).catch(catcher));
      }
      break;
    default:
      break;
  }
  res.end();
};

export default handler;
