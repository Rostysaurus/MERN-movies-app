import React from 'react'
import { useEffect, useState } from "react"
import { useFavesContext } from '../hooks/useFavesContext'
import { Fragment } from 'react'
import MovieDetails from './MovieDetails'

export default function Favourites() {
  const { dispatch, faves } = useFavesContext()
  const [movies, setMovies ] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch("api/faves")
      const data = await response.json()
      const films = data.map(f => f.movie)

      if (response.ok) {
        dispatch({type: "SET_FAVES", payload: data})
      }
    }
    fetchMovies()

  }, [])

  console.log(movies)

  return (
    <Fragment>
    <div className="home">
    {faves && faves.map(fave => (
      <MovieDetails key={fave.id} movie={fave.movie}/>
    ))}
    </div>
    </Fragment>
  )
}
