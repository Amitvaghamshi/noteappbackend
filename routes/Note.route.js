const express=require("express");
const {NoteModel} =require("../model/Note.model");
const {authantication} = require("../middleware/Auth.middleware");

let noteRouter=express.Router();
// USE MIDDLEWARE FOR AUTH
noteRouter.use(authantication);

//add notes
noteRouter.post("/create",async (req,res)=>{
        let payload=req.body;
        try{
            let note=new NoteModel(payload);
            await note.save();
            res.status(200);
            res.send({msg:"DATA SAVED"});
        }catch(err){
            res.status(500);
            res.send({msg:"Not able to add"});
        }
})

// Get notes of all the user
noteRouter.get("/" ,async (req,res)=>{
    try{
        let data=await NoteModel.find({userID:req.body.userID});
        res.send({data});
    }catch(err){
        res.send({msg:"Not able to add"});
    }
})

// DELETE THE NOTE BUT we can not delete others note
noteRouter.delete("/delete/:id",async (req,res)=>{
    try{

        let id=req.params.id;
        let note=await NoteModel.findOne({_id:id});
        let userId_of_note=note.userID;
    
        let userid_of_loggedin_user=req.body.userID;


        if(userId_of_note !== userid_of_loggedin_user){
            res.send({msg:"Unauthorised user(You can not delete someones note)"});
        }else{
            await NoteModel.deleteOne({_id:id});
            // console.log(res);
             res.send({msg:"DELETED"});
        }
    }catch(err){
        console.log(err); 
        res.send({msg:"SOME THING WRONG"});
    }
})

noteRouter.put("/update/:id",async (req,res)=>{
    try{

        let id=req.params.id;
        let note=await NoteModel.findOne({_id:id});
        let userId_of_note=note.userID;
    
        let userid_of_loggedin_user=req.body.userID;

        if(userId_of_note !== userid_of_loggedin_user){
            res.send({msg:"Unauthorised user  (You can not Update someones note)"});
        }else{
            let payload= req.body;
            await NoteModel.updateOne({_id:id},{...payload});
            res.send({msg:"DATA UPDATED"});
        } 
    }catch(err){
        res.send({msg:"SOME THING WRONG"});
    }
})

module.exports={
    noteRouter
}



