const express = require('express')
const app = express()
const port = 3001
const router = require('./routes/auth')
// CONNECTION TO THE DATABASE
const mongoose = require('./database/db')
// TO SEND POST REQUESTS
app.use(express.json())


app.use("/api/user",router)





app.listen(port,()=>{
    console.log(" Server Up and Running")
})