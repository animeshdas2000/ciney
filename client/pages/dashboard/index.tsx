import Link from "next/link"
import React, { useState } from "react"

function Dashboard() {
  const [movies, setMovies] = useState([])

  return (
    <div>
      <h1 className="text-5xl text-center">Dashboard</h1>
      <div className="flex flex-col items-center justify-center">
        {/* <Link href="/dashboard/movies">
          <button className="p-4 m-3 max-w-fit rounded-2xl text-white bg-blue-900 ">
            Book Movie Tickets
          </button>
        </Link> */}
        {/* <Link href="/tickets">
          <button className="p-4 m-3 max-w-fit rounded-2xl text-white bg-blue-900 ">
            View my Booked Tickets
          </button>
        </Link> */}
      </div>
    </div>
  )
}

export default Dashboard
