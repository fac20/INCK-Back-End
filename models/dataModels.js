const db = require('../database/connection');
const users = require('./userModels');

function displayAllData() {
    return db
    .query('SELECT * FROM work where user_id = 3 UNION SELECT * FROM play where user_id = 3')


}