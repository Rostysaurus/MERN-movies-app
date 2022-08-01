const mongoose = require("mongoose")
const Fave = require("../models/faveModel")

// GET all faves (index)
const getAllFaves = async (req, res) => {
  const {id} = req.params
  const {userId} = req.body
  const faves = await Fave.find({userId: userId}).sort({createdAt: -1})

  res.status(200).json(faves)
  }

  // GET all faves of a spesific user
  const getUserFaves = async (req, res) => {
    const {id} = req.params
    const faves = await Fave.find({userId: id}).sort({createdAt: -1})
  }

  // GET a single Fave (show)
  const showFave = async (req, res) => {
    const { id } = req.params

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(404).json({error: "No such workout"})
    // }

    const fave = await Fave.findOne({id})
    console.log(fave)

    if (!fave) {
      return res.status(400).json({error: "No such fave"})
    }

    res.status(200).json(fave)
  }

  // CREATE a new Fave (create)
  const createFave = async (req, res) => {
    const {userId} = req.body
    const { title, release_date, poster_path, overview, original_language, genre_ids, id, isFavourite, playlist_ids, vote_average } = req.body.movie

    // add to DB
    try {
      const fave = await Fave.create({ id: id, userId, movie: {title, release_date, poster_path, overview, original_language, genre_ids, id, isFavourite, playlist_ids, vote_average} })
      res.status(200).json(fave)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }

  //DELETE a fave (destroy)
  const deleteFave = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: "No such workout"})
    }

    const fave = await Fave.findByIdAndDelete({_id: id})

    if (!fave) {
      return res.status(400).json({error: "No such fave"})
    }

    res.status(200).json(fave)
  }

  // UPDATE a fave (update)
  const updateFave = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: "No such workout"})
    }

    const fave = await Fave.findByIdAndUpdate({_id: id}, {
      ...req.body
    })

    if (!fave) {
      return res.status(400).json({error: "No such fave"})
    }

    res.status(200).json(fave)
  }

  // DELETE ALL faves
  const deleteFaves = async (req, res) => {
    const faves = await Fave.deleteMany({})

    res.status(200).json(faves)
  }

  // Find by id and UPDATE
  const updateOne = async (req, res) => {
    const { id, isFavourite } = req.body

    const fave = await Fave.findOneAndUpdate({id: id}, {
      ...req.body
    })

    if (!fave) {
      return res.status(400).json({error: "No such fave"})
    }

    res.status(200).json(fave)
  }

  // Find by id and DELETE
  const deleteOne = async (req, res) => {
    const { id } = req.params.userId

    console.log(typeof parseInt(id), id)

    const fave = await Fave.findOneAndRemove({id: id})
    console.log("DELETED:", fave)

    if (!fave) {
      return res.status(400).json({error: "No such fave"})
    }

    res.status(200).json(fave)
  }

  module.exports = {
    getAllFaves,
    getUserFaves,
    showFave,
    createFave,
    deleteFave,
    updateFave,
    deleteFaves,
    updateOne,
    deleteOne
  }
