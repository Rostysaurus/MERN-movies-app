const express = require("express")
const router = express.Router()
const { updateUser, deleteUser, allUsers, showUser} = require("../controllers/usersController")
const verify = require("../verifyToken")

// INDEX
router.get("/", allUsers)

// SHOW
router.get("/:id", showUser)

// UPDATE
router.put("/:id", verify, updateUser)

// DELETE
router.delete("/:id", verify, deleteUser)


module.exports = router;
