import React from 'react'
import { useEffect, useState } from "react";


export default function Home() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=7559e79f7d4b04282d92faaacf49e489&language=en-US&page=1")
      const moviesData = await res.json()
      const movies = moviesData.results

      setMovies(movies)
    }

    fetchMovies()
  }, [])

  console.log(movies)

  return (
    <div className="home">
      <h2>Home</h2>
    </div>
  )
}
