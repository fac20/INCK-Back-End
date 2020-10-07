const db = require('../database/connection');
const users = require('./userModels');

function addWork(userWork) {
  return db.query(
    'INSERT INTO work(user_id, work_time, time_posted) VALUES ($1, $2, $3)',
    [userWork.id, userWork.timeSpent, userWork.timeSubmitted]
  );
}

module.exports = {
  addWork
};
