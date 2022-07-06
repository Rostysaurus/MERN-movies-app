import React from 'react'
import { useEffect, useState } from "react";
import "../index.scss"
import MovieDetails from '../components/MovieDetails';


export default function Home() {
  const [movies, setMovies] = useState([])
  const popularMovies = process.env.REACT_APP_POPULAR

  console.log(popularMovies)

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(popularMovies)
      const moviesData = await res.json()
      const movies = moviesData.results

      setMovies(movies)
    }

    fetchMovies()
  }, [])

  console.log(movies)

  return (
    <div className="home">
      {movies && movies.map((movie) => (
        <MovieDetails key={movie.id} movie={movie}/>
      ))}
    </div>
  )
}
