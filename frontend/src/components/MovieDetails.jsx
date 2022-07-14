import { useFavesContext } from '../hooks/useFavesContext'
import { Fragment, useState} from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { motion } from "framer-motion"

export default function MovieDetails({movie}) {
  const { dispatch, faves } = useFavesContext()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [error, setError] = useState(null)
  const { title, poster_path, overview, release_date, original_language, genre_ids, vote_average, id } = movie
  const imageUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`
  const modalClasses = `modal ${modalIsOpen ? `opened` : `closed`}`

  const handleModal = () => {
    setModalIsOpen(prev => !prev)
  }


  const isFave = (id) => {
    return faves.some(fave => fave.id === id)
  }

  const favouriteHandler = async (e) => {
    e.preventDefault()

    // Creating a Fave
    if (!isFave(movie.id)) {
      const response = await fetch("/api/faves", {
            method: "POST",
            body: JSON.stringify({movie: movie}),
            headers: {
              "Content-Type": "application/json"
            }
          })

          const data = await response.json()

          if (!response.ok) {
            setError(data.error)
          }

          if (response.ok) {
            dispatch({type: "CREATE_FAVE", payload: data})
          }
    // Removing a Fave
    } else {
      const response = await fetch(`/api/faves/${movie.id}`, {
        method: "GET",
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error)
      }

      if (response.ok) {
        dispatch({type: "DELETE_FAVE", payload: data})
      }
    }
  }

  return (
    <Fragment>
      {( title && poster_path && overview && genre_ids && vote_average ?
        <div className="card">
          <div className="image">
            <motion.div
                whileHover={{
                  originX: 0,
                }}
                whileTap={{ scale: 0.9 }}
                >
                  {isFave(id) ? <FavoriteIcon className={`heart faved`} onClick={favouriteHandler}/> : <FavoriteBorderIcon className='heart' onClick={favouriteHandler}/>}
            </motion.div >

            <PlaylistAddIcon className='more'/>
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
