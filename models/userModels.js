const db = require('./../connection.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


function addUser(user) {
    return bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(user.password, salt))
    .then(hashedPwd => {
          user.password = hash;
          return db.query(
              'INSERT INTO users(username,password) VALUES($1, $2)'
              [user.username, user.password]
          )
    })
    .then(result => console.log(result))
    .then(result => result.rows[0])
    .catch(error)
}

//addUser();