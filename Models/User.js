const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    age: String
})

const UserModel = model('User', userSchema);

module.exports = {
    UserModel
}