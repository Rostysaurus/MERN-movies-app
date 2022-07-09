import React from 'react'
import { useMoviesContext } from '../hooks/useMoviesContext'
import { Fragment, useState } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function MovieDetails({movie}) {
  const { dispatch, movies } = useMoviesContext()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [error, setError] = useState(null)
  const { title, poster_path, overview, release_date, original_language, genre_ids, vote_average, id } = movie
  const imageUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`
  const modalClasses = `modal ${modalIsOpen ? `opened` : `closed`}`

  const handleModal = () => {
    setModalIsOpen(prev => !prev)
  }

  console.log(movies)

  const isFavourite = (id) => {
    return movies.some(film => film.id === id)
  }

  const favouriteHandler = async (e) => {
    e.preventDefault()

    if (isFavourite(movie.id) === true ) {
      const response = await fetch(`/api/movies/:${movie._id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error)
      }

      if (response.ok) {
        setError(null)
        dispatch({type: "DELETE_MOVIE", payload: movie})
        console.log("deleted", isFavourite(movie.id), movie)
      }
    } else if (isFavourite(movie.id) === false) {
      const response = await fetch("/api/movies", {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error)
      }

      if (response.ok) {
        setError(null)
        dispatch({type: "CREATE_MOVIE", payload: data})
        console.log("added", isFavourite(data.id), data)
      }
    }

  }

  //

  return (
    <Fragment>
      {( title && poster_path && overview && genre_ids && vote_average ?
        <div className="card">
          <div className="image">
            {/* {console.log(isFavourite(movie.id), movie.id)} */}
            {<FavoriteBorderIcon className='heart' onClick={favouriteHandler}/>}
            {/* {isFavourite(movie.id) ? <FavoriteIcon className='heart' onClick={unfaveHandler()}/> : <FavoriteBorderIcon className='heart' onClick={favouriteHandler}/> } */}
            <MoreVertIcon className='more'/>
            <img src={imageUrl} alt={title} />
          </div>
        <div className="cardInfo" onClick={handleModal}>
          <h3>{title}</h3>
          <span>{vote_average}</span>
        </div>
        <div className={modalClasses} onClick={handleModal}>
              <h2>Overview:</h2>
              <br />
              <p>{overview}</p>
          </div>
      </div>
      : null
      )}

    </Fragment>
  )
}
