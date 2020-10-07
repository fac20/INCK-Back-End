const db = require('../database/connection.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//This function actually will add a user to the Heroku database
function addUser(user) {
  return bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(user.password, salt))
    .then(hashedPwd => {
      user.password = hashedPwd;
      return db
        .query(
          'INSERT INTO users(username, password) VALUES($1, $2) RETURNING *',
          [user.username, user.password]
        )
        .then(result => result.rows[0]);
    })
    .catch(error => error);
}

//username or password to compare
function findUser(id) {
  return (
    db
      .query('SELECT * FROM users WHERE id = ($1)', [id])
      .then(user => {
        return user.rows[0];
      })
      //catch error
      .catch(error => error)
  );
}

module.exports = {
  addUser,
  findUser
};
