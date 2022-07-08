import React from 'react'
import { Link } from "react-router-dom"
import Favourites from './Favourites'
import Playlists from './Playlists'
import "../index.scss"

export default function Navbar() {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Movie tracker</h1>
        </Link>
        <div className="links">
          <Link to="/favourites">Faves</Link>
          <Link to="/playlists">{<Playlists/>}</Link>
        </div>
      </div>
    </header>
  )
}
