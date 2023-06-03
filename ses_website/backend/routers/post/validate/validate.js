const joi= require("joi")

const validate = joi.object({
    file:joi.string().required(),
    description:joi.string().required(),
    title:joi.string().required(),
    sana:joi.string().required()
})

module.exports = validate