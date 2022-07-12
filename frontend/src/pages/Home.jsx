import React from 'react'
import { useEffect, useState, useMemo } from "react";
import "../index.scss"
import MovieDetails from '../components/MovieDetails';
import { Fragment } from 'react';
import { useFavesContext } from '../hooks/useFavesContext';

export default function Home() {

  const [movies, setMovies] = useState([])
  const key = process.env.REACT_APP_KEY
  const [query, setQuery] = useState("")
  const popularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`
  const search = `https://api.themoviedb.org/3/search/multi?api_key=${key}&language=en-US&include_adult=false&query=${query}`

  // console.log(popularMovies)

  const { dispatch } = useFavesContext()

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch("api/movies")
      const data = await response.json()

      if (response.ok) {
        dispatch({type: "SET_MOVIES", payload: data})
      }
    }
    fetchMovies()
  }, [])

  useEffect(() => {

    if (query !== "") {
      const fetchMovies = async () => {
        const res = await fetch(search)
        const moviesData = await res.json()
        const movies = moviesData.results
        setMovies(movies)
      }
      fetchMovies()
    } else {
      const fetchMovies = async () => {
        const res = await fetch(popularMovies)
        const moviesData = await res.json()
        const movies = moviesData.results
        setMovies(movies)
      }
      fetchMovies()
    }



  }, [query])

  console.log(movies)

  const searchHandle = (e) => {
    e.preventDefault()
    setQuery(e.target.value)
  }

  return (
    <Fragment>
    <div className="search">
      <input type="text" onChange={searchHandle}/>
    </div>
    <div className="home">
      {movies && movies.map((movie) => (
        <MovieDetails key={movie.id} movie={movie}/>
      ))}
    </div>
    </Fragment>
  )
}
