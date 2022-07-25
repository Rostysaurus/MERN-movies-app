import { Link } from "react-router-dom"
import Favourites from './Favourites'
import Playlists from './Playlists'
import Login from "../pages/login/Login"
import "../index.scss"
import { useFavesContext } from '../hooks/useFavesContext'
import { Fragment, useState} from 'react';
import { motion } from "framer-motion"
import { Badge } from "@material-ui/core"
import { useAuthContext } from "../hooks/useAuthContext"
import { logout } from "../context/authContext/AuthActions"

export default function Navbar() {
  const {faves} = useFavesContext()
  const {user, dispatch} = useAuthContext()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Movie tracker</h1>
        </Link>
        <div className="links">
          {user &&
          <Fragment>
            <Badge badgeContent={faves.length} color="primary" className="badge" overlap="rectangular">
              <Link to="/favourites" className="Faves">Faves</Link>
            </Badge>
            <Link to="/playlists">{<Playlists/>}</Link>
          </Fragment>}
          {user ? (<a onClick={handleLogout}>Logout</a>) : (<Link to="/login">Login</Link>)}
        </div>
      </div>
    </header>
  )
}
