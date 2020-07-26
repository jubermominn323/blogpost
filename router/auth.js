const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const user = mongoose.model('user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { SignupValidator, SigninValidator } = require('../validator/auth')
const { runValidation } = require('../validator')
// const requirelogin = require('../middleware/requirelogin')

router.post('/signup', SignupValidator,runValidation ,(req,res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password){
        return res.status(422).json({error:"Add all fields"})
    }

    user.findOne({email: email}).then(saveUser=>{
        if(saveUser)
        return res.status(422).json({message:"User already exists"})

        bcrypt.hash(password,12)
        .then((hashedpassword) => {

            const userData = new user({
                name, email, password:hashedpassword
            })
            userData.save()
            .then((userData)=>{
                res.json({message:"Saved Successfully"})
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
})

router.post('/signin', SigninValidator ,(req, res) =>{
    const { email, password } = req.body

    if( !email || !password ){
        return res.status(422).json({message:"User Not found"})
    }

    user.findOne({email: email})
    .then(saveUser =>{
        if( !saveUser)
        return res.status(422).json({error:"Invalid email or password"})

        bcrypt.compare(password, saveUser.password)
        .then(doMatch =>{
            if(doMatch){
                const token = jwt.sign({_id: saveUser._id}, process.env.JWT_SECRET, {
                    expiresIn: "7d"
                })

                const { _id, name, email } = saveUser
                return res.json({
                    token,
                    saveUser:{
                        _id,
                        name,
                        email
                    },
                    message:"User sign in successfully"
                })
            }

            else{
                return res.status(422).json({error:"Invalid user or password"})
            }
        })
        .catch(err=> console.log(err))
    })
})

module.exports = router