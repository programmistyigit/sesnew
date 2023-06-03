const validateObj = require('./validate/validate')
const _ = require("lodash")
const router = require('express').Router()
const schema = require("./schema/schema")
const { reGenerateToken, generateToken } = require("./token/token")

router.post('/', async (req, res) => {
    const result = validateObj.validate(_.pick(req.body, ["login", "password"]))
    if (result.error) throw new Error("validatsiyadan otmadi " + result.error.details[0].message)

    const admin = await schema.find()
    const [{ login, password }] = admin
    console.log(admin);
    if (login == result.value.login && password == result.value.password) {
        const token = generateToken(admin)
        return res.send({ token:token.value, status: true })
    }
    res.send({ status: false })
})

module.exports = router