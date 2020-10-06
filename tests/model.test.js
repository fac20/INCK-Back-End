const test = require("tape");
const supertest = require("supertest");
require("dotenv").config
const db = require('../connection')
const build = require('../build')
/* All model tests */

test('DB tests are running!', (t) => {
	const x = 5;
	t.equal(x, 5, 'this is working');
	t.end();
});