const mongoose = require("mongoose");
const Schema = mongoose.Schema

let Post = new Schema({

    title:{
        type:String
    },
    paragraph:{
        type:String
    }

})



module.exports = mongoose.model("Post",Post)