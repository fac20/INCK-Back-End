const test = require('tape');
const supertest = require('supertest');
require('dotenv').config;
const build = require('../database/build');
const db = require('../database/connection');
const { addUser, findUser } = require('./../models/userModels');
const usersHandlers = require('./../handlers/usersHandlers');
const server = require('./../server');
const bcrypt = require('bcryptjs');

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
    supertest(server)
      .post('/signup')
      .send(data)
      .expect(201)
      .end((err, res) => {
        t.error(err);
        username = res.body.username;
        t.equal(username, 'zenny', 'Usernames match');
        t.end();
      });
  });
});

//login- will you recieve access token on login with correct username and password?
test('Logging in', t => {
  build().then(() => {
    supertest(server)
      .post('/login')
      //if we put this in body, we need to reference it by req.body.body.id
      .send({ username: 'TheBaddestB', password: 'beyonce' })
      // .set({}) authorisation header here if needed
      .expect(200)
      .expect('content-type', 'application/json; charset=utf-8')
      .end((err, res) => {
        t.error(err);
        t.ok(
          Object.keys(res.body).includes('access_token'),
          'check response object contains an access token key'
        );
        t.end();
      });
  });
});

test('Signing up with a username already there', t => {
  build().then(() => {
    supertest(server)
      .post('/signup')
      //if we put this in body, we need to reference it by req.body.id
      .send({ username: 'TheBaddestB', password: 'beyonce' })
      // .set({}) authorisation header here if needed
      .expect(409)
      .expect('content-type', 'text/html; charset=utf-8')
      .end((err, res) => {
        t.error(err);
        t.end();
      });
  });
});

test('checking signup handler, new signup, fail on purpose', t => {
  build().then(() => {
    supertest(server)
      .post('/signup')
      //if we put this in body, we need to reference it by req.body.id
      .send({ username: 'TEST1', password: 'beyonce' })
      // .set({}) authorisation header here if needed
      .expect(201)
      .expect('content-type', 'application/json; charset=utf-8')
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
