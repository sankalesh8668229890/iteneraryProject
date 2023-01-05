const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const route = require('./routes/routes.js');
const mongoose = require('mongoose');

require("dotenv").config()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use("/", route)

app.listen(process.env.PORT || 3000, (err)=> {
    console.log("Connected to PORT 3000")
})