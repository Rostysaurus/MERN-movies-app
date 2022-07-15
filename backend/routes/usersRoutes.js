const express = require("express")
const router = express.Router()
const { updateUser, deleteUser, allUsers} = require("../controllers/usersController")
const verify = require("../verifyToken")

// INDEX
router.get("/", allUsers)

// UPDATE
router.put("/:id", verify, updateUser)

// DELETE
router.delete("/:id", verify, deleteUser)

module.exports = router;
