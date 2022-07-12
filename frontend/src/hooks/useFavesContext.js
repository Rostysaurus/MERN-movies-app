import { FavesContext } from "../context/FavesContext";
import { useContext } from "react";

export const useFavesContext = () => {
  const context = useContext(FavesContext)

  if (!context) {
    throw Error("useFavesContext must be used inside a FavesContextProvider")
  }

  return context
}
