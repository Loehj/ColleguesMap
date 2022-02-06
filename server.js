const express = require('express');
const { get } = require('express/lib/request');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Running on port ${port}`));

/*
var db = new sqlite3.Database('./db/citiesDB.db', (err) => {
	if (err) {
		console.error(err.message);
	}
})
db.run(`INSERT INTO cities(name, lat, lng)
	VALUES('Mosbach', '49.348787437632915', '9.129510453902565')
`);
db.close((err) => {
	if (err) {
		console.error(err.message);
	}
})*/

app.get('/getCities', async (req, res) => {
	var db = new sqlite3.Database('./db/citiesDB.db', (err) => {
		if (err) {
    		console.error(err.message);
		}
	})
	db.all(`SELECT * FROM cities`, (err, rows) => {
		if (err){
			console.log("hi");
		  res.status(500).send(err);
		}
		res.status(200).send(rows);
	});
	db.close((err) => {
		if (err) {
			console.error(err.message);
		}
	})
});

app.post('/addCity', (req, res) => {
	console.log(req.query);
	if(req.query.city != null && req.query.lat != null && req.query.lng != null && req.query.city != "" && req.query.lat != "" && req.query.lng != ""){
		var db = new sqlite3.Database('./db/citiesDB.db', (err) => {
			if (err) {
				console.error(err.message);
			}
		})
		db.run(`INSERT INTO cities(name, lat, lng)
			VALUES('${req.query.city}', '${req.query.lat}', '${req.query.lng}')
		`);
		res.status(200).send(`${req.query.city} added`);
	} else {
		res.status(500).send(`invalid input: ${req.query}`);
	}
	db.close((err) => {
		if (err) {
			console.error(err.message);
		}
	})
});

app.get('/getCitiesGrouped', async (req, res) => {
	var db = new sqlite3.Database('./db/citiesDB.db', (err) => {
		if (err) {
    		console.error(err.message);
		}
	})
	db.all(`SELECT name, lat, lng, COUNT(*) as count FROM cities GROUP BY name, lat, lng`, (err, rows) => {
		if (err){
		  res.status(500).send(err);
		}
		res.status(200).send(rows);
	});
	db.close((err) => {
		if (err) {
			console.error(err.message);
		}
	})
});

/* Clear TABLE
var db = new sqlite3.Database('./db/citiesDB.db', (err) => {
	if (err) {
		console.error(err.message);
	}
})
db.serialize(() => {
	db.run(`DELETE FROM cities`)
	.run(`VACUUM`);
});
db.close((err) => {
	if (err) {
		console.error(err.message);
	}
})
*/