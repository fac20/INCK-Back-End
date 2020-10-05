const fs = require('fs');
const path = require('path');
const db = require('./connection')

const initPath = path.join(_dirname, "init.sql");
const initSQL = fs.readFileSync(initPath, 'utf-8');

function build () {
    return db.query(initSQL);
}

if(require.main === module){
    build().then(()=> db.end());
}


module.exports = build;