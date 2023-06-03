const secure = (req, res, next)=>{
// console.log(req.admin , 1);
    if(req.admin) next()
    else res.send({status:"error" , message:"siz admin emassiz"})
}

module.exports = secure