const express = require('express');
const { Client } = require('pg');

// load env variables from .env for development
require('dotenv').config();

const parse = require('pg-connection-string').parse;
const config = parse(process.env.DATABASE_URL || '');

const client = new Client({
	user: config.user,
	host: config.host,
	database: config.database,
	password: config.password,
	port: config.port,
});

const app = express();
app.listen(process.env.PORT || 3000, () => console.log(`Running on port 3000`));

app.get('/', async (req, res) => {
	await client.connect();
	client.query('SELECT NOW()', async (err, res) => {
		console.log(err, res);
		res.status(200).send(res);
		await client.end();
	});
});

app.post('/addCity', (req, res) => {
	console.log(req.query);
	res.status(200).send('hallo API');
});
