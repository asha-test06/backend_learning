require('dotenv').config();
const routes = require('./routes/routes');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
console.log(mongoString);
mongoose.connect(mongoString);
const database = mongoose.connection;
database.once('connected',() =>{
    console.log('Database Connected')
})
const app = express();

app.use(express.json())

app.listen(3000, () => {
    console.log(`Server started at ${3000}`)
})
app.use('/api', routes)