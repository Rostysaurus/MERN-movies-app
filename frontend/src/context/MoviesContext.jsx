import { createContext, useReducer } from "react";

export const MoviesContext = createContext()

export const moviesReducer = (state, action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return {
        movies: action.payload
      }
    case "CREATE_MOVIE":
      return {
        movies: [action.payload, ...state.movies]
      }
    case "DELETE_MOVIE":
      return {
        movies: state.movies.filter((movie) => movie._id !== action.payload._id)
      }
    case "TOGGLE_MODAL":
      return {
        modalIsOpen: !state.modalIsOpen,
      }
    default:
      return state
  }
}


export const MoviesContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(moviesReducer, {
    movies: null,
    modalIsOpen: false,
  })

  return (
    <MoviesContext.Provider value={{...state, dispatch}}>
      {children}
    </MoviesContext.Provider>
  )
}