const db = require('../database/connection.js');

function addPlayTime(time) {
  return db
    .query('INSERT INTO play(user_id, play_time, time_posted) VALUES($1,$2, $3)', [
      time.user_id,
      time.timeSpent,
      time.timeSubmitted
    ])
    .then(result => result.rows[0])
    .catch(error => error);
}

function getPlayTimebyID(num) {
  return db
  .query('SELECT * FROM play WHERE user_id=$1', [num])
  .then(result => result.rows)
  .catch(error => error);

}

function updatePlayTime() {
  
}

function deletePlayTime (timeID) {
  return db.query('DELETE FROM play WHERE id=($1)', [timeID]);
}

module.exports = {
  addPlayTime,
  getPlayTimebyID,
  updatePlayTime,
  deletePlayTime
};
