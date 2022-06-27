import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import axios from "axios";

function Ticket() {
  const router = useRouter();
  const { id } = router.query;
  const [ticketData, setTicketData] = useState();
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await axios.get(`/api/booking/${id}`);
        console.log(res.data);
        setTicketData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTicket();
  }, []);
  return (
    <div>
      {JSON.stringify(ticketData)}
      <h1
        css={css`
          color: #21216d;
        `}>
        Ticket
      </h1>
    </div>
  );
}

export default Ticket;
