const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const users = require('./../models/userModels');
const db = require('./../connection');
dotenv.config();
const SECRET = process.env.JWT_SECRET;

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const error = new Error('Unauthorised!');
    error.status = 400;
    next(error);
  }
  try {
    const token = authHeader.replace('Bearer ', '');
    const tokenData = jwt.verify(token, SECRET);
    console.log(tokenData);
    //use ID to
    users
      .findUser(tokenData.id) //check ID actually exists
      .then(user => {
        next();
      })
      .catch(next);
  } catch (e) {
    const error = new Error('Unauthorized');
    error.status = 401;
    next(error);
  }
}

module.exports = authenticate;
