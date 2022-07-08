const mongoose = require("mongoose")

const Schema = mongoose.Schema
const movieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  release_date: {
    type: Date,
    required: true
  },
  poster_path: {
    type: String,
    required: true
  },
  overview: {
    type: String,
    required: true
  },
  original_language: {
    type: String,
    required: true
  },
  genre_ids: {
    type: Array,
    required: true
  },
  id: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model("Movie", movieSchema)
