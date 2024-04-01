const {UserModel} =require("../model/User.model")
const jwt=require("jsonwebtoken");
const bcrypt = require('bcrypt');
const express=require("express");

let UserRouter=express.Router();

UserRouter.post("/ragister",async (req,res)=>{

    let payload=req.body;
    let saltRounds=4;
    // Syncronious APP
    //  const hash = bcrypt.hashSync(payload.password, saltRounds);
    //  payload.password=hash;

       // Asyncronious APP     
       try{
            bcrypt.hash(payload.password, saltRounds, async (err, hash) =>{
                if(err){
                    res.status(300);
                    res.send({msg:"ERROR IN HASHING"});
                }else{
                    payload.password=hash;
                    let user=new UserModel(payload);
                    await user.save();
                    res.status(200);
                    res.send({msg:"USER SAVED"});
                }
            });
       }catch(err){
         // console.log(err);
          res.status(500);
          res.send({msg:"NOT ABLE TO SAVE"});
       }
       
})

UserRouter.post("/login",async (req,res)=>{
       try{
            let {email,password}=req.body;
            let user=await UserModel.find({email});

            if(user.length>0){
                bcrypt.compare(password, user[0].password, function(err, result) {
                    if(result){
                        var token = jwt.sign({ userID:user[0]._id }, 'amit', {expiresIn: 30000});
                        res.status(200);
                        res.send({msg:"LOGIN SUCCESS",token});
                    }else{
                        res.status(401);
                        res.send({msg:"PASSWORD IS WRONG"});
                    }
                });
            }else{
                res.status(401);
                res.send({msg:"USER IS NOT FOUND WITH EMAIL "+email})
            }
       }catch(err){
        res.status(501);
        res.send({msg:"OPPS SOMETHING WENT WRONG"});
       }
})

module.exports={
    UserRouter
}
