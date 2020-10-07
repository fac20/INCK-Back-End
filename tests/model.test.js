const test = require('tape');
const supertest = require('supertest');
require('dotenv').config;
const build = require('../database/build');
const db = require('../database/connection');
const { addUser, findUser } = require('./../models/userModels');
const usersHandlers = require('./../handlers/usersHandlers');
const server = require('./../server');

/* All model tests */
//finduser
//test signup- has user been added to db table?
test('Signing up a new user', t => {
  build().then(() => {
    const data = {
      username: 'zenny',
      password: 'zen2020',
      id: 4
    };
    addUser(data)
      .then(data => findUser(data.id))
      .then(user => {
        username = user.username;
        password = user.password;
        t.equal(username, 'zenny');
        t.end();
      })
      .catch(error => {
        t.error(error);
        t.end();
      });
  });
});

//login- will you recieve access token on login with correct username and password?
test('Logging in', t => {
  build().then(() => {
    supertest(server)
      .post('/login')
      .send({ body: { id: 1, password: 'beyonce' } })
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

test('Close DB pool (not a real test)', t => {
  // otherwise tests will pause for 10s in the terminal
  db.end();
  t.end();
});
