require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const moviesRoutes = require("./routes/moviesRoutes")
const favesRoutes = require("./routes/favesRoutes")
const authRoutes = require("./routes/authRoutes")
const usersRoutes = require("./routes/usersRoutes")
const playlistsRoutes = require("./routes/playlistsRoutes")

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next( )
})

// router
app.use("/api/movies", moviesRoutes)
app.use("/api/faves", favesRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/playlists", playlistsRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to DB & listening on port", process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error);
  })
