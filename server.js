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
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running on port ${port}`));

app.get('/', async (req, res) => {
	await client.connect();

	try {
		const result = await client.query('SELECT NOW()');

		// TODO: Do something with the result
	} catch (e) {
		console.error('Error while fetching query', e);
		res.sendStatus(500);
	}

	res.status(200).send('Test');
});

app.post('/addCity', (req, res) => {
	console.log(req.query);
	res.status(200).send('hallo API');
});
