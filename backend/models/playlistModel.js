const mongoose = require("mongoose")
const Schema = mongoose.Schema

const playlistSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  movieIds: [{
    type: Number
  }],
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model("Playlist", playlistSchema)
