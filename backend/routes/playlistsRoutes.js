const express = require("express")
const { getAllPlaylists, createPlaylist, updatePlaylist } =  require("../controllers/playlistsController")
const router = express.Router()

// GET all playlists
router.get("/", getAllPlaylists)
// SHOW a playlist

// CREATE a playlist
router.post("/", createPlaylist)

// UPDATE a playlist
router.patch("/:id", updatePlaylist)

// DELETE a playlist

module.exports = router
