import express from 'express'

const app = express()

app.listen(process.env.PORT || 3000, () => console.log(`Running on port 3000`))
app.get("/", (req, res) => {
    res.status(200).send("hallo API");
})
app.post("/addCity", (req, res) =>{
    console.log(req.query);
    res.status(200).send("hallo API");
})

const { Client } = require('pg')

const client = new Client({
  user: 'gxqitzqehblwik',
  host: 'ec2-54-247-96-153.eu-west-1.compute.amazonaws.com',
  database: 'df8tqi9etlsvm',
  password: '178dc89973a69c877c69af23df1b6deb7db6d920006148c57412225df4cba8b6',
  port: 5432,
})
client.connect()
client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})