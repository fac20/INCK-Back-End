const work = require('./../models/workModels');
const jwt = require('jsonwebtoken');
require('dotenv').config;

function addWork(req, res, next) {
  console.log(req);
  const id = req.user.id;
  const workObj = req.body;

  const userWork = {
    id: id,
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

module.exports = {
  addWork
};
