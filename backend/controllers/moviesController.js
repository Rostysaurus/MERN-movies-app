const mongoose = require("mongoose")
const Movie = require("../models/movieModel")

// GET all movies (index)
const getAllMovies = async (req, res) => {
  const movies = await Movie.find({}).sort({createdAt: -1})

  res.status(200).json(movies)
  }

  // GET a single movie (show)
  const showMovie = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: "No such workout"})
    }

    const movie = await Movie.findById(id)

    if (!movie) {
      return res.status(400).json({error: "No such movie"})
    }

    res.status(200).json(movie)
  }

  // CREATE a new movie (create)
  const createMovie = async (req, res) => {
    const { title, release_date, poster_path, overview, original_language, genre_ids, id, isFavourite, playlist_ids } = req.body

    // add to DB
    try {
      const movie = await Movie.create({ title, release_date, poster_path, overview, original_language, genre_ids, id, isFavourite, playlist_ids })
      res.status(200).json(movie)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }

  //DELETE a movie (destroy)
  const deleteMovie = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: "No such workout"})
    }

    const movie = await Movie.findByIdAndDelete({_id: id})

    if (!movie) {
      return res.status(400).json({error: "No such movie"})
    }

    res.status(200).json(movie)
  }

  // UPDATE a movie (update)
  const updateMovie = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: "No such workout"})
    }

    const movie = await Movie.findByIdAndUpdate({_id: id}, {
      ...req.body
    })

    if (!movie) {
      return res.status(400).json({error: "No such movie"})
    }

    res.status(200).json(movie)
  }

  // DELETE ALL movies
  const deleteMovies = async (req, res) => {
    const movies = await Movie.deleteMany({})

    res.status(200).json(movies)
  }

  // DELETE by id

  // Up


  module.exports = {
    getAllMovies,
    showMovie,
    createMovie,
    deleteMovie,
    updateMovie,
    deleteMovies
  }
