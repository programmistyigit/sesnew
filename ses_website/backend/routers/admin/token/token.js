const jwt = require("json-web-token")
const pass = process.env.jwt
const generateToken = (obj)=>{
    return jwt.encode(pass , obj)
}

const reGenerateToken = (token)=>{
    return jwt.decode(pass , token)
}

module.exports = { generateToken , reGenerateToken }