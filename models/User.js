const mongoose = require('mongoose')

UserSchema = mongoose.Schema({
    email :
    {
        type : String,
        required: true
    },
    password :
    {
        type : String,
        required : true
    },
    buildAt :
    {
        type : Date,
        default : Date.now()
    }
})

const user = mongoose.model('user', UserSchema)
module.exports = user
