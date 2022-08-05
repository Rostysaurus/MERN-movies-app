const mongoose = require("mongoose")
const Playlist = require("../models/playlistModel")

// GET all playlists
const getAllPlaylists = async (req, res) => {
    console.log(req.query)
    const {id} = req.query
    try {
      const playlists = await Playlist.find({userId: id}).sort({createdAt: -1})
      res.status(200).json(playlists)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

// GET all user's playlists

// SHOW a playlist

// CREATE a playlist
const createPlaylist = async (req, res) => {
  const { title, movies, userId } = req.body

  // add to DB
  try {
    const playlist = await Playlist.create({title: title, movies: movies, userId: userId})
    res.status(200).json(playlist)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// UPDATE a playlist
const updatePlaylist = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No such playlist"})
  }

  try {
    const playlist = await Playlist.findByIdAndUpdate({_id: id}, {
      ...req.body
    })
    res.status(200).json(playlist)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// DELETE a playlist

module.exports = {
  createPlaylist,
  updatePlaylist,
  getAllPlaylists
}
