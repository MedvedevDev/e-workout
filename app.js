const express = require('express')
const router = require('./router')
require('./db/mongoose')

const app = express()

app.use(express.urlencoded({extended: false})) //tells express a user submitted data to REQUEST object (for post requests)
app.use(express.json())

app.set('views', 'views')
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(router)

app.listen(3000)