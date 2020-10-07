const test = require('tape');
const supertest = require('supertest');
require('dotenv').config;
const build = require('../build');
const db = require('../connection');
const { addUser, findUser } = require('./../models/userModels');
const usersHandlers = require('./../handlers/usersHandlers');
const server = require('./../server');
const bcrypt = require('bcryptjs');

/* All model tests */

//test signup- has user been added to db table?

//login- will you receive access token on login with correct username and password?
test('Logging in', t => {
  //salt+hash password
  let properPassword;
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash('beyonce', salt))
    .then(hashedPwd => {
      properPassword = hashedPwd;
    });

  build().then(() => {
    supertest(server)
      .post('/login')
      //if we put this in body, we need to reference it by req.body.body.id
      .send({ id: 1, password: properPassword })
      // .set({}) authorisation header here if needed
      .expect(200)
      .expect('content-type', 'application-json')
      .end((err, res) => {
        t.error(err);
        t.end();
      });
  });
});

//authenticate- do you have access to some route that is logged-in user only?
//are you able to access a route only for authorised users?

//addWork- has the work entry been added to the db?
