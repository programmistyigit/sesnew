require("express-async-errors")
require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mongoose = require("mongoose");
const cors = require("cors")
const cookie = require("cookie-parser")
console.log(process.env.mongoDB_HOST);
mongoose
.connect("mongodb+srv://sesuser:jAoagYEcPKQuNfvp@cluster0.bfmmk0n.mongodb.net/ses")
.then(() => {
        console.log(`Server connected to MongoDB...`);
    })
    .catch((e) => console.log(`Server is not connected to MongoDB... ${e.toString()}`));
//     origin:"http://localhost:3000",
// }))
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Methods", "DELETE")
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  })
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie("COOKIE"))
// routers
const postRouter = require("./routers/post/post")
const adminRouter = require("./routers/admin/admin")
const messageRouter = require("./routers/message/message.js")
// routers

// Middleware
const admin = require("./middleware/admin")
app.use(admin)
// Middleware


//  Routers
app.use("/post" , postRouter)
app.use("/admin", adminRouter)
app.use("/message" , messageRouter)
//  Routers


// ERROR midleware 

app.use((err , req, res , next)=>{
    console.log(err+"");
    if(err) return res.status(501).send({error:true , message:"serverda siz yuborgan malumotlar tufayli hatolik aniqlandi" , err:err+""})
    next()
})

app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))