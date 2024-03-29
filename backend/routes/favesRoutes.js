const express = require("express")
const { getAllFaves, getUserFaves, createFave, deleteFave, updateFave, deleteFaves, updateOne, deleteOne } = require("../controllers/FavesController")

const router = express.Router()

// // GET all Faves (index)
router.get("/", getAllFaves)

router.get("/:userId", getUserFaves)

// // GET a single Fave (show)
// router.get("/:id", showFave)

// // CREATE a new Fave (create)
router.post("/", createFave)

// //DELETE a Fave (destroy)
// router.delete("/:id", deleteFave)

// // UPDATE a Fave (update)
router.patch("/:id", updateFave)

// DELETE ALL
router.delete("/", deleteFaves)

// UPDATE one
router.patch("/", updateOne)

// DELETE one
router.delete("/:id", deleteOne)

module.exports = router;
