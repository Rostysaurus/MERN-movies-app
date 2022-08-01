import React from 'react'
import { useEffect, useState } from "react"
import { useFavesContext } from '../hooks/useFavesContext'
import { Fragment } from 'react'
import MovieDetails from './MovieDetails'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Favourites() {
  const { dispatch, faves } = useFavesContext()
  const [movies, setMovies ] = useState([])
  const {user} = useAuthContext()

  console.log(faves)

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(`api/faves/${user._id}`)
      const data = await response.json()
      console.log(data)

      if (response.ok) {
        dispatch({type: "SET_FAVES", payload: data})
      }
    }
    fetchMovies()

  }, [])

  console.log(movies)

  return (
    <Fragment>
      <div className="homeContainer">
        <div className="home">
          {faves && faves.map(fave => (
            <MovieDetails key={fave.id} movie={fave.movie}/>
          ))}
        </div>
      </div>
    </Fragment>
  )
}
