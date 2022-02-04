import express from 'express'

const app = express()

app.listen(3000, () => console.log(`Running on port 3000`))
app.get("/", (req, res) => {
    res.status(200).send("hallo API");
})
app.post("/addCity", (req, res) =>{
    console.log(req.query);
    res.status(200).send("hallo API");
})