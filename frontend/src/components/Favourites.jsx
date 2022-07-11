import React from 'react'
import { useContext, useEffect } from "react"
import { useMoviesContext } from '../hooks/useMoviesContext'

export default function Favourites() {

  const { dispatch, movies } = useMoviesContext()

  return (
    <div>{movies.map(movie => (<p>{movie.isFavourite ? "true" : "false"}</p>))}</div>
  )
}
