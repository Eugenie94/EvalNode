const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./Routes/index').router

app.set('view engine', 'ejs')
app.use('/public', express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

// Connexion à la base de données
mongoose.connect('mongodb+srv://Xena94:Praline94,@evaluationnode.gvezs.mongodb.net/evaluationNode?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => {
    console.log(err)
})

app.use('', router)


app.listen(port, () => {
    console.log('Le server écoute sur le port ' + port)
})