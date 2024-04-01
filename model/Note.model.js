const mongoose=require("mongoose");

let noteschema=mongoose.Schema({
    title:String,
    description:String,
    userID:String
})

const NoteModel=mongoose.model("note",noteschema);

module.exports={
    NoteModel
}


