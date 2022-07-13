import { createContext, useReducer } from "react";

export const FavesContext = createContext()

export const favesReducer = (state, action) => {
  switch (action.type) {
    case "SET_FAVES":
      return {
        faves: action.payload
      }
    case "CREATE_FAVE":
      return {
        faves: [action.payload, ...state.faves]
      }
    case "DELETE_FAVE":
      return {
        faves: state.faves.filter((fave) => fave.id !== action.payload.id)
      }
    default:
      return state
  }
}


export const FavesContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(favesReducer, {
    faves: [],
  })

  return (
    <FavesContext.Provider value={{...state, dispatch}}>
      {children}
    </FavesContext.Provider>
  )
}
