import React from 'react'
import { useMoviesContext } from '../hooks/useMoviesContext'
import { Fragment, useState } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function MovieDetails({movie}) {
  const { dispatch } = useMoviesContext()
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const { title, poster_path, overview, release_date, original_language, genre_ids, vote_average, id } = movie
  const imageUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`
  const background = {backgroundImage: `url("${imageUrl}")`}
  const modalClasses = `modal ${modalIsOpen ? `opened` : `closed`}`

  const handleModal = () => {
    setModalIsOpen(prev => !prev)
  }

  return (
    <Fragment>
      {( title && poster_path && overview && genre_ids && vote_average ?
        <div className="card">
          <div className="image">
            <FavoriteBorderIcon className='heart'/>
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
