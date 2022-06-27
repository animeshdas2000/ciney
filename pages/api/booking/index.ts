import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../lib/db";
import { ResponseFn } from "../../../lib/types";
import { Movies } from "../../../lib/models/movies";
import { Ticket } from "../../../lib/models/ticket";
import { Seat } from "../../../lib/models/seat";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFn = req.method as keyof ResponseFn;

  const catcher = (error: Error) => res.json({ error });
  // Potential Responses
  // const name: string = "MovieNew";
  // const duration: number = 123;

  const handleCase: ResponseFn = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      await connect();
      // const {id} =
      // const seat_obj = await Seat.findById(seat_id).catch(catcher);
      res.json(await Ticket.find({}).catch(catcher));
    },
    // RESPONSE POST REQUESTS
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { id, name } = req.body;
      await connect();
      // const seat_id = "62b8bbc05ce851d229541dd8";
      const seat_id = "62b97c3138960e083c7a3b4e";
      const seat_obj = await Seat.findById(seat_id).catch(catcher);
      // console.log(seat_obj);
      const newBooking = await new Ticket({
        id,
        name,
        seat: seat_obj,
      });
      res.json(await Ticket.create(newBooking).catch(catcher));
    },
  };

  const response = handleCase[method];
  if (response) {
    response(req, res);
  } else {
    res.status(400).json({ error: "No Response for This Request" });
  }
};

export default handler;
