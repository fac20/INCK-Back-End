const work = require('./../models/workModels');
const jwt = require('jsonwebtoken');
require('dotenv').config;
const SECRET = process.env.JWT_SECRET;

function getIDfromToken (header) {
  const token = header.replace('Bearer ', '');
  const tokenData = jwt.verify(token, SECRET);
  return tokenData.id;
}

function addWork(req, res, next) {
  const token = req.headers.authorization.replace('Bearer ', '');
  const tokenData = jwt.verify(token, SECRET);
  // console.log(req);
  const id = tokenData.id;
  const workObj = req.body;
  const userWork = {
    "id": id,
    timeSpent: workObj.time,
    timeSubmitted: workObj.dateTime
  };

  work
    .addWork(userWork)
    .then(() => {
      res.status(201).send({
        message: 'Work time added'
      });
    })
    .catch(next);
}

// function createHarvest(req, res, next) {
// 	const id = req.user.id;
// 	const harvestData = req.body;
// 	console.log('user id createHarvest Handler:', id);
// 	console.log(harvestData);
// 	harvestModel
// 		.createHarvest(harvestData, id)
// 		.then(() => {
// 			res.status(201).send({
// 				message: 'harvest created',
// 			});
// 		})
// 		.catch(next);
// }

function getWork(req, res, next) {
  const token = req.headers.authorization.replace('Bearer ', '');
  const tokenData = jwt.verify(token, SECRET);
  const id = tokenData.id;
  work.getWorkTimebyID(id)
  .then(results => {
    res.status(200)
    .send(results);
  }).catch(next)
  
}

function modifyWork(req, res, next) {}

function deleteWork(req, res, next) {}


module.exports = {
  addWork,
  getWork,
  modifyWork,
  deleteWork,
};
