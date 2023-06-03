const { model, Schema } = require("mongoose");

const messageScheama = new Schema({
    message:String,
    tell:String,
    fullName:String,
    view:{
        type:Boolean,
        default:false,
        required:true
    }
})


module.exports = model("messages" , messageScheama)