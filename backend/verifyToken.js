const jwt = require('jsonwebtoken');

secretKey = process.env.SECRET_KEY

const verify = (req, res, next) => {
  const authHEader = req.headers.token
  if (authHEader) {
    const token = authHEader.split(" ")[1]

    jwt.verify(token, secretKey, (err, user) => {
      if (err) res.status(403).json({message: "Token not valid!"})
      req.user = user
      next()
    })

  } else {
    return res.status(401).json({message: "You are not authenticated!"})
  }
}

module.exports = verify
