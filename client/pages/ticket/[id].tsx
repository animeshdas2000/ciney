import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"

function Ticket() {
  const router = useRouter()
  const { id } = router.query
  const [ticketData, setTicketData] = useState<any>("")
  const fetchTicket = async () => {
    try {
      const res = await axios.get(`/api/booking/${id}`)
      console.log(res.data)
      setTicketData(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (id !== undefined) {
      fetchTicket()
    }
  }, [id])
  return (
    <div className=" flex flex-col items-center">
      <h1 className="text-2xl text-center font-bold text-indigo-900">
        Your Ticket
      </h1>

      <div className="m-10 p-10 bg-slate-200 border-dashed border-blue-400 border-4 rounded-lg w-72">
        <p>Booked by:{ticketData?.name}</p>
        <p>
          <strong>Seats</strong>
        </p>
        <ul className="list-disc">
          {ticketData?.seats?.map((val: any, key: any) => {
            return (
              <li key={key}>
                {val.row}-{val.col}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Ticket
