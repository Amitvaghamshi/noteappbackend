const express=require("express");
const {connection} = require("./config/db.js");
const {authantication}=require("./middleware/Auth.middleware.js")
const {UserRouter} =require("./routes/User.route.js");
const {noteRouter} = require("./routes/Note.route.js");
var cors = require('cors')

const app=express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

// USER ROUTER
app.use("/user",UserRouter);

//Notes Router
app.use("/notes",noteRouter);


//THIS ROUTES NEED AUTH
app.use(authantication);

app.get("/data",(req,res)=>{
    try{ 
       res.send("DATA....");
    }catch(err){
        res.send("SOME THING WENT WRONG IN DBS");
    }
})
 
app.get("/cart",(req,res)=>{
    try{
        res.send("CART....");
     }catch(err){
         res.send("SOME THING WENT WRONG IN DBS");
     }
})


app.listen(5000,async ()=>{

    try{
        await connection
        console.log("CONNECTED TO DB");
    }catch(err){
        console.log(err);
    }
    console.log("SERVER STARTED ON PORT 5000");
})

