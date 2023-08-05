const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true 
        
    },
    password:{
        type:String,
        required:true
    }
})

// now we need to create a collection

const CapRegister = new mongoose.model("CapRegister",userSchema);

module.exports = CapRegister;