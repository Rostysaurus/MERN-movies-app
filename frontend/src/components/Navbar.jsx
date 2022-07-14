import { Link } from "react-router-dom"
import Favourites from './Favourites'
import Playlists from './Playlists'
import "../index.scss"
import { useFavesContext } from '../hooks/useFavesContext'
import { Fragment, useState} from 'react';
import { motion } from "framer-motion"
import { Badge } from "@material-ui/core"

export default function Navbar() {
  const {faves} = useFavesContext()

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Movie tracker</h1>
        </Link>
        <div className="links">
          <Badge badgeContent={faves.length} color="primary" className="badge" overlap="rectangular">
            <Link to="/favourites" className="Faves">Faves</Link>
          </Badge>
          <Link to="/playlists">{<Playlists/>}</Link>
        </div>
      </div>
    </header>
  )
}
