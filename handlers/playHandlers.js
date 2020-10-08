const play = require('../models/playModels');
const jwt = require('jsonwebtoken');
require('dotenv').config;
const SECRET = process.env.JWT_SECRET;

function addPlay(req, res, next) {
  const token = req.headers.authorization.replace('Bearer ', '');
  const tokenData = jwt.verify(token, SECRET);

  const id = tokenData.id;
  const playObj = req.body;

  const time = {
    "id": id,
    timeSpent: playObj.time,
    timeSubmitted: playObj.dateTime
  };

  play
    .addPlayTime(time)
    .then(() => {
      res.status(201).send({
        message: 'Play time added'
      });
    })
    .catch(next);
}

module.exports = {
  addPlay
};
