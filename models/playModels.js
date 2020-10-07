const db = require('../database/connection.js');

function addPlayTime(time) {
  return db
    .query('INSERT INTO play(user_id, play_time) VALUES($1,$2)', [
      time.user_id,
      time.timeSpent
    ])
    .then(result => {
      return result.rows[0];
    })
    .catch(error => error);
}

module.exports = {
  addPlayTime
};
