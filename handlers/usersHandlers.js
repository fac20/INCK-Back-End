  
const users = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.JWT_SECRET;


function signup(req, res, next) {
	const userData = req.body;
	users
		.addUser(userData)
		.then(user => {
			const token = jwt.sign(
				{
					id: user.id,
				},
				SECRET,
				{
					expiresIn: '1h',
				}
			);
			const response = {
				id: user.id,
				username: user.username,
				access_token: token,
			};
			res.status(201).send(response);
		})
		.catch(next);
}