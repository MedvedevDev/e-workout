const express = require('express')
const app = express()

app.use(express.urlencoded({extended: false})) //tells express a user submitted data to REQUEST object (for post requests)
app.use(express.json())

app.set('views', 'views')
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(3000)