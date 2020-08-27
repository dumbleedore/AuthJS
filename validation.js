
const joi = require('@hapi/joi')



const RegisterValidation = (req,res) =>{ 
    const schema = joi.object({   
    email : joi.string().min(6).email().required(),
    password : joi.string().min(6).required()

})
    const {error} = schema.validate(req.body)
    if(error){

        res.send("Must be a valid email")
        return true
    }
    else{
        return false
    }

    
}


module.exports = RegisterValidation
