const express = require("express")
const app = express.Router()
const axios = require("axios").default
const router = require("../routes/routes");
// const userSchema  = require("./userSchema");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});
const user = mongoose.model('User', userSchema);

app.get("/user", async (req, res) => {
    try {
        const response = await axios.get("https://randomuser.me/api/");
        const userData = response.data.results[0];
        const newUser = {
            firstname: userData.name.first,
            lastname: userData.name.last,
            age: userData.dob.age
        }
        res.status(200).json(newUser);
        axios.post("http://localhost:3000/axios/user",newUser)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
});
app.post("/user", async (req, res) => {
    try {
        const { firstname, lastname, age } = req.body;
        const newUser = new userSchema({ firstname, lastname, age })
        await newUser.save();
        res.status(200).json(newUser);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
})
module.exports = app