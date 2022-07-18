import React, { useState, useEffect } from "react";
import axios from "axios";
import { css } from "@emotion/react";
import Link from "next/link";
function Movies() {
  const [movies, setMovies] = useState<any[]>([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`/api/movies`);
        console.log(res.data);
        setMovies(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, []);
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
      `}>
      {movies.map((val, key) => {
        return (
          <div
            css={css`
              display: flex;
              width: 20rem;
              text-align: center;
              flex-direction: column;
              align-items: center;
              background-color: #001242;
              border-radius: 2rem;
              padding: 4rem;
              color: #ffffff;
              flex-wrap: wrap;
              margin: 4rem;
            `}
            key={key}>
            <h1 className="text-3xl font-bold ">{val.name}</h1>
            <span>{val.duration} mintues</span>
            <Link href={`/dashboard/movies/${val._id}`}>
              <button className="p-4 m-3 max-w-fit rounded-2xl text-white font-semibold bg-blue-500 shadow-slate-800">
                Book Tickets
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Movies;
