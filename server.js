const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 2000
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
require('dotenv').config()
require('./model/user')
require('./model/post')

app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log("DB connected"))
.catch(err=> console.log("DB connection failed", err))

app.use(cors())

app.use(require('./router/auth'))
app.use(require('./router/post'))

app.listen(PORT,() =>{
    console.log(`Server running at port ${PORT}`)
})