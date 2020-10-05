const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3000; 
const handleErrors = require('./middleware/errorHandling');

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

//server routes



//error handling middleware
server.use(handleErrors);

server.listen(PORT, () => 
    console.log(`Listening on port http:localhost:${3000}`))