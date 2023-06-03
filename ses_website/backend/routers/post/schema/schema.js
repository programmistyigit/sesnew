const { Schema, model } = require("mongoose");

const postChema =new Schema({
    file:String,
    description:String,
    title:String,
    sana:String
})


module.exports = model("posts" , postChema)