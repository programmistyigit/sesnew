const { model, Schema } = require("mongoose");

const adminSchema = new Schema({
    login:String,
    password:String
})


module.exports = model("admins" , adminSchema)