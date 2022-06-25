import React from "react";

import { useRouter } from "next/router";
import { css } from "@emotion/react";
function Ticket() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      {id}
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
