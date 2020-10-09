
const jwt = require('jsonwebtoken')
require('dotenv').config


function getAllData (req, res, next) {
    const token = req.headers.authorization.replace('Bearer', '');
    const tokenData = jwt.verify(token, SECRET);

    const id = tokenData.id;


    



}


module.exports =  {
    getAllData
}