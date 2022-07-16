const mongoose = require("mongoose")
const User = require("../models/userModel")
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

secretKey = process.env.SECRET_KEY

// INDEX
const allUsers = async (req, res) => {
  const users = await User.find({})

  if (!users) {
    res.status(404).json({message: "No users found"})
    return
  }

  res.status(200).json(users)
}

// SHOW
const showUser = async (req, res) => {
  const {id} = req.params

  const user = await User.findById(id)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No such user"})
  }

  res.status(200).json(user)
}

// UPDATE
const updateUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(req.body.password, secretKey).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
      res.status(200).json(updatedUser)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  } else {
    res.status(403).json({message: "You can only update your own account!"})
  }
}

// DELETE
const deleteUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {

    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id)
      res.status(200).json("User deleted!")
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  } else {
    res.status(403).json({message: "You can only delete your own account!"})
  }
}

// GET USER STATS

module.exports = {
  updateUser,
  deleteUser,
  allUsers,
  showUser
  }
