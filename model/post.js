const mongoose = require('mongoose')
const {ObjectId}=mongoose.Schema.Types

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    content:{
        type:String,
        required:true
    },

    postedBy:{
        type: ObjectId,
        ref:"user"
    }
})
mongoose.model('post', PostSchema)