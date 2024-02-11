import React, { useState } from "react"
import { trpc } from "../../utils/trpc"
export type movie = {
  name: string
  movie_id: string
  duration: number
  image_url: string
  show_time: string[]
}
function Admin() {
  const [movieData, setMovieData] = useState<movie>({
    movie_id: "",
    name: "",
    duration: 0,
    image_url: "",
    show_time: [""],
  })

  const mutation = trpc.movies.createMovie.useMutation()
  const handleMovieMutation = () => {
    console.log(movieData.show_time)
    mutation.mutate(movieData)
  }

  return (
    <div>
      <h1>Admin dashboard</h1>
      <h2>Enter the Movie Details</h2>
      <form
        onSubmit={handleMovieMutation}
        className="flex flex-col container mx-auto max-w-sm space-y-4"
      >
        <label htmlFor="MovieID">Movie ID</label>
        <input
          type="text"
          onChange={(event) =>
            setMovieData({
              ...movieData,
              movie_id: event?.target.value,
            })
          }
          placeholder="123"
        />
        <label htmlFor="MovieName">Name</label>
        <input
          type="text"
          onChange={(event) =>
            setMovieData({
              ...movieData,
              name: event?.target.value,
            })
          }
          placeholder="Name"
        />
        <label htmlFor="Duration">Duration</label>
        <input
          type="number"
          onChange={(event) =>
            setMovieData({
              ...movieData,
              duration: parseInt(event?.target.value),
            })
          }
          placeholder="Duration"
        />
        <label htmlFor="Image URL">Image URL</label>
        <input
          type="text"
          onChange={(event) =>
            setMovieData({
              ...movieData,
              image_url: event?.target.value,
            })
          }
          placeholder="https://www.image.com/png"
        />
        <label htmlFor="Show time">Show time</label>
        <input
          type="datetime-local"
          onChange={(event) => {
            let dateObj = new Date(event?.target.value)
            console.log(dateObj.toISOString())
            setMovieData({
              ...movieData,
              show_time: [dateObj.toISOString()],
            })
          }}
        />
        <button
          type="submit"
          className=" bg-gray-700 rounded-md shadow-md px-8 py-2"
        >
          Submit
        </button>
      </form>
      {/* <p>{mutation.isSuccess ?? ""}</p> */}
    </div>
  )
}

export default Admin
