const mongoose=require("mongoose");

let userSchema=mongoose.Schema({
      name:String,
      email:{type:String,required:true},
      password:{type:String,required:true},
      age:Number
})

const UserModel=mongoose.model("user",userSchema);

module.exports={
    UserModel
}