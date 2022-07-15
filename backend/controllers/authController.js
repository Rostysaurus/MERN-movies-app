const mongoose = require("mongoose")
const User = require("../models/userModel")
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

secretKey = process.env.SECRET_KEY

// Register
const register = async (req, res) => {
  const {username, email, password, profilePic, isAdmin} = req.body
  const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();

  try {
    const newUser = await User.create({
      username: username,
      email: email,
      password: encryptedPassword,
      profilePic: profilePic,
      isAdmin: isAdmin
    })
    res.status(200).json(newUser)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// Login
const login = async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email})

    if (!user) {
      res.status(401).json("Wrong password or username!")
      return
    }

    const bytes  = CryptoJS.AES.decrypt(user.password, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    originalText !== req.body.password && res.status(401).json("Wrong password or username!")

    const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, secretKey, {expiresIn: "5d"})

    const {password, ...info} = user._doc
    res.status(200).json({...info, accessToken})

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = {
register,
login
}
