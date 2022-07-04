const Movie = require("../models/movieModel")
const express = require("express")

const router = express.Router()

// GET all workouts (index)
router.get("/", async (req, res) => {
const movies = await Movie.find({}).sort({createdAt: -1})

res.status(200).json(movies)
})

// GET a single wotkout (show)
router.get("/:id")

// CREATE a new workout (create)
router.post("/", async (req, res) => {
  const { title, release_date, poster_path, overview, original_language } = req.body

  // add to DB
  try {
    const movie = await Movie.create({ title, release_date, poster_path, overview, original_language })
    res.status(200).json(movie)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

//DELETE a workout (destroy)
router.delete("/:id")

// UPDATE a workout (update)
router.patch("/:id")

module.exports = router;
