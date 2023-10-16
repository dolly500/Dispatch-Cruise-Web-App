const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const collection =require("./mongodb")

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
    await collection.insertMany([data])
    // const absolutePathToIndexHTML = path.join(__dirname, "..", "index.html")
    //     res.sendFile(absolutePathToIndexHTML);    
    res.render("login");
})

app.post("/login", async (req, res) =>{
   try{
    const check = await collection.findOne({email: req.body.email})

    if(check.password===req.body.password){
        const absolutePathToIndexHTML =  path.join(__dirname, "..", "index.html")
            res.sendFile(absolutePathToIndexHTML)
    }
    else{
        res.render("wrong password")
    }
   }
   catch{
    res.send("wrong details")
   }
})


app.listen(3000, () => {
    console.log('port connected');
})  