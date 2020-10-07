const play = require('../models/playModels');

function addPlay(req, res, next) {
  const id = req.body.id;
  const playObj = req.body;

  const time = {
    id: id,
    timeSpent: playObj.time,
    timeSubmitted: playObj.dateTime
  };

  play
    .addWork(time)
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
