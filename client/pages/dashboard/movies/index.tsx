import React, { useState, useEffect } from "react";
import axios from "axios";

import Movie from "./[movieId]";
import { Keyboard } from "@mui/icons-material";
import Link from "next/link";
function Movies() {
  const [movies, setMovies] = useState<any[]>([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/movies`);
        console.log(res.data);
        setMovies(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, []);
  return (
    <div>
      {movies.map((val, key) => {
        return (
          <div key={key}>
            <p>{val.name}</p>
            <p>{val.duration}</p>
            <p>{val.movie_id}</p>
            <Link href={`/dashboard/movies/${val._id}`}>Book tickets</Link>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default Movies;
