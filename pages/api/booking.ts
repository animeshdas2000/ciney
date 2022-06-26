import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../lib/db";
import { ResponseFn } from "../../lib/types";
import { Movies } from "../../lib/models/movies";
import { Ticket } from "../../lib/models/ticket";
import { Seat } from "../../lib/models/seat";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFn = req.method as keyof ResponseFn;

  const catcher = (error: Error) => res.json({ error });
  // Potential Responses
  // const name: string = "MovieNew";
  // const duration: number = 123;
  const { id, name } = req.body;
  const handleCase: ResponseFn = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      await connect();
      res.status(200).json(await Movies.find({}).catch(catcher));
    },
    // RESPONSE POST REQUESTS
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      await connect();
      let seat_Obj;
      const _id = "62b8bbc05ce851d229541dd8";
      Seat.findById(_id)
        .then((seatObj) => {
          seat_Obj = seatObj;
        })
        .catch((err) => {
          console.log("findBy error", err);
        });
      const newBooking = new Ticket({
        id,
        name,
        seat_Obj,
      });
      // newBooking.save().catch(catcher);
      // const newMovie = new Movies({
      //   name,
      //   duration,
      // });
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
