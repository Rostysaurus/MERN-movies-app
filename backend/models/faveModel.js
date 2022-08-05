const mongoose = require("mongoose")

const Schema = mongoose.Schema
const faveSchema = new Schema({
  id: {
    type: Number,
    required: false,
    unique: false
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  movie: {
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
    playlist_ids: {
      type: Array,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    vote_average: {
      type: Number,
      required: true
    }
  }
}, { timestamps: true })

module.exports = mongoose.model("Fave", faveSchema)
