

const mongoose = require("mongoose")


const Userschema = new mongoose.Schema({

    Name:{type:String, required:true},
    Email:{type:String, require:true},
    Age:{type:Number}

})


const User = new mongoose.model("User", Userschema)


module.exports = User



