import React from "react"
import axios from "axios"
import Link from "next/link"
import { IMovie } from "../../../lib/models/movies"
import { trpc } from "../../../utils/trpc"
import { movie } from "../../admin"
import Image from "next/image"
function Movies() {
  const { data, isError, isSuccess } = trpc.movies.getMovies.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  )
  console.log(data?.pages[0]?.data)

  return (
    <div className="container mx-auto">
      <div className=" bg-gray-400/10 w-full h-80 rounded-xl"></div>
      <h2 className="text-2xl font-bold my-4">Trending this week</h2>
      <div className="flex flex-row flex-wrap space-x-8">
        {isSuccess &&
          data?.pages[0]?.data.map((val, key) => {
            return (
              <div
                className="flex w-80 text-center flex-col items-center bg-gray-400/10 text-white my-8 p-6 rounded-xl"
                key={key}
              >
                <Image
                  src={val?.image_url}
                  width="300"
                  height="300"
                  alt={val?.name}
                  className="rounded-lg"
                />
                <h3 className="text-3xl font-bold mt-6">{val?.name}</h3>
                <span>{val?.duration} mintues</span>
                <Link href={`/dashboard/movies/${val?._id}`}>
                  <button className="p-4 mt-4 max-w-fit rounded-2xl text-white font-semibold bg-gray-400/10 shadow-slate-800">
                    Book Tickets
                  </button>
                </Link>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Movies
