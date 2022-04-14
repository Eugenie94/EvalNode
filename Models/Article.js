const {Schema, model} = require('mongoose')

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'userSchema'
    }
})

const ArticleModel = model('Article', articleSchema);

module.exports = {
    ArticleModel
}