/* Build and export server */
const express = require('express');
require('dotenv').config();
const handleErrors = require('./middleware/errorHandling');
const authenticate = require('./middleware/authentication');
const cookieParser = require('cookie-parser');
const usersHandlers = require('./handlers/usersHandlers');
const workHandlers = require('./handlers/workHandlers');
const playHandlers = require('./handlers/playHandlers');
const dataHandlers = require('./handlers/dataHandlers');
const hostname = process.env.HOSTNAME || '0.0.0.0' || 'localhost';

const server = express();

//cors middleware allows access from our frontend on netlify
const cors = require('cors');
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//server middleware
server.use(cors(corsOptions));
server.use(express.json());
server.use(cookieParser());

//login, signup (POST)
server.post('/signup', usersHandlers.signup);
server.post('/login', usersHandlers.login);

// users change password (PUT)
// server.put('/change-password', usersHandlers.changePass);

// //submit work and play log
server.post('/post-work', authenticate, workHandlers.addWork);
server.post('/post-play', authenticate, playHandlers.addPlay);
server.get('/worktest', (req, res) => {
  res.send('<h1>hello work</h1>');
});
// //view work and play data
server.get('/work', authenticate, workHandlers.getWork);
server.get('/play', authenticate, playHandlers.getPlay);
// server.get('/data', authenticate, dataHandlers.getAllData); //would give all work and play data for one person

// //edit work and play data
// server.put('/edit-work', authenticate, workHandlers.modifyWork);
// server.put('/edit-play', authenticate, playHandlers.modifyPlay);

// //delete work and play data
// server.delete('/delete-work', authenticate, workHandlers.deleteWork);
// server.delete('/delete-play', authenticate, playHandlers.deletePlay);

//error handling middleware
server.use(handleErrors);

module.exports = server;
