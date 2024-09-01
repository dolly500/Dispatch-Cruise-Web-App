const mongoose = require("mongoose")
// const dotenv = require("dotenv").config()


// mongodb://localhost:27017/DispathCruiseLoginSignUp
//

mongoose.connect("mongodb+srv://akamods19:NpUJ0vpqfgO3Hxsb@cluster0.03bzd.mongodb.net/")
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
