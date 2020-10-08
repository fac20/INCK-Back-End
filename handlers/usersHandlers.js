const users = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.JWT_SECRET;

function signup(req, res, next) {
  const userData = req.body;
  users
    .addUser(userData)
    .then(user => {
      const token = jwt.sign(
        {
          id: user.id
        },
        SECRET,
        {
          expiresIn: '1h'
        }
      );
      const response = {
        id: user.id,
        username: user.username,
        access_token: token
      };
      res.status(201).send(response);
    })
    .catch(next);
}

function login(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  users
    .findUserByName(username)
    .then(user => {
      //make sure the password they just submitted matches the same one in the database
      console.log(user);
      const match = bcrypt.compareSync(password, user.password);
      //if there is a match, sign a token and send it to them
      if (match) {
        const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });
        res.status(200).send({ access_token: token });
      }
      //if it doesn't match, tell them to go away because their password is wrong
      else {
        const error = new Error('Password not recognised');
        error.status = 401;
        next(error);
      }
    })
    //catch any errors and pass them to the next function- error handling middleware
    .catch(next);
}

module.exports = {
  signup,
  login
};
