const mongoose = require("mongoose")
// const dotenv = require("dotenv").config()


// mongodb://localhost:27017/DispathCruiseLoginSignUp

mongoose.connect("mongodb+srv://dolapoakamo01:YcfbxZshMHh0NIM4@cluster0.ijxxrs8.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("mongodb connected");
})

.catch(err => {
    console.log("Failed to Connect " + err.message);
})

const LogInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    re_enter_password: {
        type: String,
        required: true
    }
})

const collection= new mongoose.model("DispathCruiseCollections", LogInSchema)

module.exports = collection
