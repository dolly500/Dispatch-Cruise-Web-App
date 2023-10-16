const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/DispathCruiseLoginSignUp")
.then(() => {
    console.log("mongodb connected");
})

.catch(err => {
    console.log("Failed to Connect", err);
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
