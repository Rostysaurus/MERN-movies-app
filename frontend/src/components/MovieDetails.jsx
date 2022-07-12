import React from 'react'
import { useFavesContext } from '../hooks/useFavesContext'
import { Fragment, useState } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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

  console.log(faves)

  const isFave = (id) => {
    return faves.some(fave => fave.id === id)
  }

  const favouriteHandler = async (e) => {
    e.preventDefault()
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
            console.log(data)
          }
    } else {
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
        dispatch({type: "CREATE_FAVE", payload: data.movie})
        console.log(data.movie)
      }
    }
  }

  const test = async (e) => {
e.preventDefault()

console.log("Movie exists but is NOT a Fave:", movie.title)


        const response = await fetch("/api/faves", {
          method: "DELETE",
          body: JSON.stringify({id: movie.id}),
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
          dispatch({type: "UPDATE_ONE", payload: data})
          console.log("added", data.title)
        }

    // if (existsInMovies((movie.id))) {
    //   if (isFave(movie.id)){
    //     console.log("Movie exists and is a Fave:", movie.title, isFave(movie.id))

    //     const response = await fetch("/api/movies", {
    //       method: "PATCH",
    //       body: JSON.stringify({...movie, isFavourite: false}),
    //       headers: {
    //         "Content-Type": "application/json"
    //       }
    //     })

    //     const data = await response.json()

    //     if (!response.ok) {
    //       setError(data.error)
    //     }

    //     if (response.ok) {
    //       setError(null)
    //       dispatch({type: "UPDATE_ONE", payload: data})
    //       console.log("removed", data.title, existsInMovies(data.id), data.isFavourite, data.id)
    //     }

    //   } else if (!isFave(movie.id)) {
    //     console.log("Movie exists but is NOT a Fave:", movie.title)

    //     const response = await fetch("/api/movies", {
    //       method: "PATCH",
    //       body: JSON.stringify({...movie, isFavourite: true}),
    //       headers: {
    //         "Content-Type": "application/json"
    //       }
    //     })

    //     const data = await response.json()

    //     if (!response.ok) {
    //       setError(data.error)
    //     }

    //     if (response.ok) {
    //       setError(null)
    //       dispatch({type: "UPDATE_ONE", payload: data})
    //       console.log("added", data.title, existsInMovies(data.id), data.isFavourite, data.id)
    //     }
    //   }
    // } else if (!existsInMovies((movie.id))) {
    //   console.log("Movie does NOT exist and is NOT a Fave:", movie.title)

    //   const response = await fetch("/api/movies", {
    //     method: "POST",
    //     body: JSON.stringify({...movie, isFavourite: true}),
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   })

    //   const data = await response.json()

    //   if (!response.ok) {
    //     setError(data.error)
    //   }

    //   if (response.ok) {
    //     setError(null)
    //     dispatch({type: "CREATE_MOVIE", payload: data})
    //   }
    //   console.log("added", data.title, existsInMovies(data.id), "IsFave?", data.isFavourite, data.id)
    // }

  }

  //

  return (
    <Fragment>
      {( title && poster_path && overview && genre_ids && vote_average ?
        <div className="card">
          <div className="image">
            {/* {console.log(isFave(movie.id), movie.title)} */}
            {<FavoriteBorderIcon className='heart' onClick={favouriteHandler}/>}
            {/* {existsInMovies(movie.id) ? <FavoriteIcon className='heart' onClick={unfaveHandler()}/> : <FavoriteBorderIcon className='heart' onClick={favouriteHandler}/> } */}
            <MoreVertIcon className='more' onClick={test}/>
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
