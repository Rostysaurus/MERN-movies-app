const express = require("express")
const { getAllMovies, showMovie, createMovie, deleteMovie, updateMovie, deleteMovies, updateOne } = require("../controllers/moviesController")

const router = express.Router()

// // GET all movies (index)
router.get("/", getAllMovies)

// // GET a single movie (show)
router.get("/:id", showMovie)

// // CREATE a new movie (create)
router.post("/", createMovie)

// //DELETE a movie (destroy)
router.delete("/:id", deleteMovie)

// // UPDATE a movie (update)
router.patch("/:id", updateMovie)

// // DELETE ALL
router.delete("/", deleteMovies)

// UPDATE one
router.patch("/", updateOne)

module.exports = router;
