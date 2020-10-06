const db = require('./../connection.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function addUser(user) {
    console.log(user.username,user.password)
  return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hashedPwd => {
        user.password = hashedPwd;
        console.log(user.password);
        return db.query(
          'INSERT INTO users(username, password) VALUES($1, $2) RETURNING *', [user.username, user.password]
        ).then(result => result.rows[0]);
      })
      .catch(error => error)
}

//username or password to compare
function findUser(username) {
  // return query => SELECT ${user} FROM users;
  return (
    db
      .query('SELECT * FROM users WHERE username = ($1)', [username])
      .then(user => {
        //then show rows
        return user.rows[0];
      })
      //catch error
      .catch(error => error)
  );
}

//addUser();

module.exports = {
  addUser,
  findUser
};
