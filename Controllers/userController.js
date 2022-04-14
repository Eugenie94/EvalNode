const mongoose = require('mongoose')
const { UserModel } = require('../Models/User')

module.exports = {
    user: (req, res) => {
        UserModel.findById(req.body.id, (err, user) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.render('user', { user })
            }
        })
    }, 
    users: (req, res) => {
        UserModel.find({}, (err, users) => {
            if (err) {
                res.status(500).send(err)
            }
            else {
                if (!users) {
                    res.status(404).send('Aucun auteur trouvé')
                }
                res.status(200).render('index', {
                    users
                })
            }
        })
    },
    addUser: (req, res) => {
        const User = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age : req.body.age
        })
        User.save((err, user) => {
            if (err) {
                res.status(500).render('error', {
                    error: err
                })
            } else {
                res.status(200).redirect('/user')
            }
        })
    },
    deleteUser: (req, res) => {
        UserModel.deleteMany({ name: req.body.name}, (err, users) => {
            res.json({
                users
            })
        })
    }
}