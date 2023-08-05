//  For connecting DB with node js
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ImageCap", {
    
}).then(()=>{
    console.log('Connection Successful');
}).catch((err)=>{
    console.log(err);
});