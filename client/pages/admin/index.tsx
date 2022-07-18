import axios from "axios";
import React, { useState } from "react";

function Admin() {
  const [row, setRow] = useState(0);
  let something;
  let id = "62ba79c05fda8f9048ba3b1a";
  const handleSubmit = async () => {
    try {
      const res = await axios.post(`/api/seat`, {
        row,
        id,
      });
      something = res;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Admin dashboard</h1>
      <p>{something}</p>
      <input
        type="number"
        onChange={(e: any) => {
          setRow(e.target.value as number);
        }}
        className="border border-black"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Admin;
