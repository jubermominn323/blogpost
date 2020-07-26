const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const user = mongoose.model('user')

module.exports = ( req, res, next) => {
    const { authorization } = req.headers
    
    if( !authorization ){
        console.log(authorization)
        return res.status(401).json({error:"You must be login"})
    }
        const token = authorization.replace("Bearer ", "")
        
        jwt.verify(token, process.env.JWT_SECRET, (error, payload) =>{
            if(error){
                return res.status(404).json({error:"User not found"})
            }
            const {_id} = payload
            user.findById(_id).then(userData =>{
                req.userInfo = userData
                // console.log(req.userInfo)
                next()
            })
        })
}