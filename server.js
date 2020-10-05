/* Build and export server */
const express = require("express");
require("dotenv").config();
const handleErrors = require('./middleware/errorHandling');
const cookieParser = require("cookie-parser");
const usersHandlers = './handlers/usersHandlers';
const workHandlers = './handlers/workHandlers';
const playHandlers = './handlers/playHandlers;


const server = express();

//cors middleware allows access from our frontend on netlify
const cors = require("cors");
const corsOptions = {
	origin: "https://zenpal.netlify.app/",
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//server middleware
server.use(cors());
server.use(express.json());
server.use(cookieParser());

//login, signup (POST)
server.post('/signup', usersHandlers.signup);
server.post('/login', usersHandlers.login);

//users change password (PUT)
server.put('/change-password', usersHandlers.changePass);

//submit work and play log
server.post('/post-work', workHandlers.addWork);
server.post('/post-play', playHandlers.addPlay);

//view work and play data
server.get('/work', workHandlers.getWork);
server.get('/play', playHandlers.getPlay);

//edit work and play data
server.put('/edit-work', workHandlers.modifyWork);
server.put('/edit-play', playHandlers.modifyPlay);

//delete work and play data
server.delete('/delete-work', workHandlers.deleteWork);
server.delete('/delete-play', playHandlers.deletePlay);

//error handling middleware
server.use(handleErrors);


module.exports = server; 
