import React, { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
function Movies() {
  const [movies, setMovies] = useState<any[]>([])
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`/api/movies`)
        console.log(res.data)
        setMovies(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchMovies()
  }, [])
  return (
    <div className="flex justify-evenly flex-wrap;">
      {movies.map((val, key) => {
        return (
          <div
            className="flex w-80 text-center flex-col items-center bg-[#001242] text-white flex-wrap m-16 p-16 rounded-[2rem]"
            key={key}
          >
            <h1 className="text-3xl font-bold">{val.name}</h1>
            <span>{val.duration} mintues</span>
            <Link href={`/dashboard/movies/${val._id}`}>
              <button className="p-4 m-3 max-w-fit rounded-2xl text-white font-semibold bg-blue-500 shadow-slate-800">
                Book Tickets
              </button>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default Movies
