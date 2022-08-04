const express = require("express")
const { createPlaylist } =  require("../controllers/playlistsController")
const router = express.Router()

// GET all playlists

// SHOW a playlist

// CREATE a playlist
router.post("/", createPlaylist)

// UPDATE a playlist

// DELETE a playlist

module.exports = router
