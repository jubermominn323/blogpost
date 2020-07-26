const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const blogPost = mongoose.model('post')
const requirelogin = require('../middleware/requirelogin')

router.get('/allpost', requirelogin, (req, res) =>{
    blogPost.find({})
    .populate("postedBy", "name")
    .then(data=>{
        res.json(data)
    }).catch(err=> console.log(err))
})

router.post('/createpost',requirelogin, (req, res) => {
    const { title, content } = req.body

    if(!title || !content) {
        return res.status(422).json({error:"Add all the fields"})
    }

    
    req.userInfo.password = undefined
    const post = new blogPost({
        title: title,
        content: content,
        postedBy: req.userInfo
    })

    post.save()
    .then(result=>{
        res.json({post: result})
    })
    .catch(err=> console.log(err))
})

router.delete("/deletepost/:postId", requirelogin, (req, res) =>{
    blogPost.findOne({_id: req.params.postId})
    .populate("postedBy", "_id")
    .exec((err, post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }

        if(post.postedBy._id.toString() === req.userInfo._id.toString() ){
            post.remove()
            .then(result=>{
                res.json({result})
            })
            .catch(err=> console.log(err))
        }
    })
})

module.exports = router