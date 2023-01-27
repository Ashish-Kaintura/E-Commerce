const mongoose=require("mongoose");
// id have to be same or Collectiontable name have to be same
const userSchema=new mongoose.Schema({
            Name:String,
            Email:String,
            Password:String

})
module.exports=mongoose.model("users",userSchema);