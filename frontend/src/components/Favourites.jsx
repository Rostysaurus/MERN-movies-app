import React from 'react'
import { useContext, useEffect } from "react"
import { useFavesContext } from '../hooks/useFavesContext'

export default function Favourites() {

  const { dispatch, movies } = useFavesContext()

  return (
    <div>{movies.map(movie => (<p>{movie.isFavourite ? "true" : "false"}</p>))}</div>
  )
}
