const mongoose = require("mongoose")
const Playlist = require("../models/playlistModel")

// GET all playlists

// SHOW a playlist

// CREATE a playlist
const createPlaylist = async (req, res) => {
  const { title, movieIds, userId } = req.body

  // add to DB
  try {
    const playlist = await Playlist.create({title: title, movieIds: movieIds, userId: userId})
    res.status(200).json(playlist)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// UPDATE a playlist

// DELETE a playlist

module.exports = {
  createPlaylist
}
