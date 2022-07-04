const express = require("express")
const { getAllMovies, showMovie, createMovie, deleteMovie, updateMovie } = require("../controllers/moviesController")

const router = express.Router()

// // GET all movies (index)
router.get("/", getAllMovies)

// // GET a single movie (show)
router.get("/:id", showMovie)

// // CREATE a new movie (create)
router.get("/", createMovie)

// //DELETE a movie (destroy)
router.get("/:id", deleteMovie)

// // UPDATE a movie (update)
router.get("/:id", updateMovie)

module.exports = router;
