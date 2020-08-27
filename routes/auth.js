const express = require('express')
const router = express.Router()
const User = require('../models/User')
const register = require('../validation')
const bcrypt = require('bcryptjs')
const user = require('../models/User')
const jwt = require('jsonwebtoken')



router.post("/register", async(req,res)=>{
 
    // VALIDATION
    const op = register(req,res)
    if(op){
    }
    else if (op == false)
    {
        // CHECKING IF EMAIL ALREADY EXISTS
        const emailexist = await User.findOne({email : req.body.email})
        if(emailexist){
            return res.status(400).send("Email already exists!")
        }

        // HASH THE PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashPassword = bcrypt.hash(req.body.password, salt)


        // TRY TO CREATE A NEW USER
        try{
            const usuario = new User({
                email: req.body.email,
                password : await hashPassword
            })
            const usuariosave = await usuario.save()
            return res.json(usuario)
    
        }
        catch(err){
            console.log("Something went wrong" + err)
        }
    }

})
router.get("/list",async(req,res)=>{

    const users =  await User.find()
    return res.json(users)
})

router.post("/login",async(req,res)=>{
    const usuario = new User({
        email: req.body.email,
        password : req.body.password
    })

          // CHECKING IF EMAIL ALREADY EXISTS
          const user = await User.findOne({email : req.body.email})
          if(!user){
              return res.status(400).send("Email doesn't exists")
          }
          const validpass = await bcrypt.compare(req.body.password,user.password)
          if(!validpass){
              return res.status(400).send("Wrong Password")
          }

          // CREATE AND ASSIGN A TOKEN
          const token = jwt.sign({__id : user._id},"HUNTERXHUNTERISTHEBESTANIME")
          res.header('auto-token', token).send(token)
          res.send("Sucess!!!")
})
module.exports = router