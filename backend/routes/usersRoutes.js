const express = require("express")
const router = express.Router()
const { updateUser, deleteUser, allUsers, showUser, stats } = require("../controllers/usersController")
const verify = require("../verifyToken")

// INDEX
router.get("/", verify, allUsers)

// SHOW
router.get("/:id", verify, showUser)

// UPDATE
router.put("/:id", verify, updateUser)

// DELETE
router.delete("/:id", verify, deleteUser)

// STATS
router.get("/stats", stats)


module.exports = router;
