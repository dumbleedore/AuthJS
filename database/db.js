const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://lucas:lucas@cluster.aja2g.gcp.mongodb.net/user?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology:true } ,() =>{
    console.log("Connected to mongoose")
})

module.exports = mongoose