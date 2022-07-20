const mongoose = require("mongoose")
const User = require("../models/userModel")
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

secretKey = process.env.SECRET_KEY

// INDEX
const allUsers = async (req, res) => {
  const query = req.query.new
  if (req.user.isAdmin) {
    try {
      const users = query ? await User.find({}).sort({_id: -1}).limit(10) : await User.find({})
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  } else {
    res.status(404).json({message: "You are not allowed to see all users!"})
  }
}

// SHOW
const showUser = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const {id} = req.params

      const user = await User.findById(id)
      const {password, ...info} = user._doc

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such user"})
      }

      res.status(200).json(info)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }


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
const stats = async (req, res) => {
  const today = new Date()
  const lastYear = today.setFullYear(today.setFullYear() - 1)
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: {$month: "$createdAt"}
        }
      },
      {
        $group: {
          _id: "$month",
          total: {$sum: 1}
        }
      }
    ])

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

module.exports = {
  updateUser,
  deleteUser,
  allUsers,
  showUser,
  stats
  }
