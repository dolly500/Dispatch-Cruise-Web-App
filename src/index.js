const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const collection =require("./mongodb")

// const dotenv = require("dotenv")
// dotenv.config()

const templatePath = path.join(__dirname, '../templates')

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath); 
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '..')));


app.get("/login", (req,res)=>{
    res.render("login")
})

app.get("/signup", (req,res)=>{
    res.render("signup")
})

app.post("/signup", async (req, res) =>{
    const data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        re_enter_password: req.body.re_enter_password,
    }
    try{

     // Check if the email already exists in the database
     const existingUser = await collection.findOne({ email: data.email });

     if (existingUser) {
         // Email already exists; provide feedback to the user
         return res.render("signup", { error: "Email already exists. Please use a different email." });
     }

     // Check if the passwords match
     if (data.password !== data.re_enter_password) {
        // Passwords don't match; provide feedback to the user
        return res.render("signup", { error: "Passwords do not match. Please make sure they match and try again!" });
    }
    await collection.insertMany([data])   
    res.render("login");
    }
    catch (error) {
        // Handle any errors that occur during user registration
        console.error(error);
        res.render("signup", { error: "User registration failed. Please try again!" });
    }
})

app.post("/login", async (req, res) =>{
   try{
    const check = await collection.findOne({email: req.body.email})

    if(check.password===req.body.password){
        const absolutePathToIndexHTML =  path.join(__dirname, "..", "index.html")
            res.sendFile(absolutePathToIndexHTML)
    }
    else{
        res.render("login", {error: "Wrong Password!"})
    }
   }
   catch(error){
    //Handle any other errors if neccessary
    console.error(error);
    res.render("login", {error: "Wrong Details!"})
   }
})



app.listen(3001, () => {
    console.log('port connected ');
})  