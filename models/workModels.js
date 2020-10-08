const db = require('../database/connection');
const users = require('./userModels');

function addWork(userWork) {
  return db.query(
    'INSERT INTO work(user_id, work_time, time_posted) VALUES ($1, $2, $3)',
    [userWork.id, userWork.timeSpent, userWork.timeSubmitted]
  );
}

function getWorkTimebyID(num) {
  return db
  .query('SELECT * FROM work WHERE user_id=$1', [num])
  .then(result => result.rows)
  .catch(error => error);

}

function updateWorkTime() {
  
}

function deleteWorkTime (timeID) {
  return db.query('DELETE FROM work WHERE id=($1)', [timeID]);
}

module.exports = {
  addWork,
  getWorkTimebyID,
  updateWorkTime,
  deleteWorkTime
};
