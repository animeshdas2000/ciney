import React, { useEffect, useState } from "react"
import { generateSeatLayout } from "../lib/seatLayout"
import { trpc } from "../utils/trpc"
import Trpc from "../pages/api/trpc/[trpc]"
import { ISeat } from "../lib/models/seat"

function SeatsLayout({ date, movie_id }: { date: string; movie_id: string }) {
  const seats = generateSeatLayout(10, 10)
  const [seatLayout, setSeatLayout] = useState<ISeat[] | null>(null)
  const [tempOrder, setTempOrder] = useState<ISeat[] | null>(null)
  console.log(seats)
  const mutation = trpc.booking.createBooking.useMutation()
  useEffect(() => {
    return setSeatLayout(seats)
  }, [])
  const addToOrder = (row: string, col: string) => {
    return () => {
      let seat = { row, col }
      setTempOrder((state) => [...state, seat])
      console.log(tempOrder)
    }
  }

  const confirmOrder = () => {
    console.log(date)
    mutation.mutate({
      booking_id: "123",
      seats: tempOrder,
      movie_id: movie_id,
      show_time: date[0],
    })
  }
  return (
    <div className="overflow-x-scroll">
      <div className="grid grid-cols-10 lg:gap-6 gap-x-20 gap-y-8">
        {seatLayout?.map((seat) => {
          return (
            <button
              className={`${
                tempOrder
                  ? "bg-slate-50 w-10 h-10"
                  : "border border-solid border-gray-600 rounded-md w-10 h-10"
              } `}
              key={`${seat.row}${seat.col}`}
              onClick={addToOrder(seat.row.toString(), seat.col.toString())}
            ></button>
          )
        })}
      </div>
      <button onClick={confirmOrder}>Book Now!</button>
    </div>
  )
}

export default SeatsLayout
