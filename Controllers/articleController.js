const mongoose = require('mongoose')
const { ArticleModel } = require('../Models/Article')
const { UserModel } = require('../Models/User')

module.exports = {
    article: (req, res) => {
        UserModel.find({}, (err, users) => {
          if (err) {
            res.status(500).send(err)
          } else {
            ArticleModel.find({}, (err, articles) => {
              if (err) {
                res.status(500).send(err)
              } else {
                if (!articles) {
                  res.status(404).send('Aucun article trouvé trouvé')
                }
                res.status(200).render('index', {
                  articles,
                  users
                })
              }
            })
          }
        })
    },
    addArticle: (req, res) => {
        UserModel.findById(req.body.user, (err, user) => {
            if (err) {
                res.status(500).send(err)
            } else {
                const article = new ArticleModel({
                    _id: new mongoose.Types.ObjectId(),
                    title: req.body.title,
                    description: req.body.description,
                    user: user.id
                })
                article.save((err, article) => {
                    if (err) {
                        res.status(500).render('error', {
                            error: err
                        })
                    } else {
                        res.status(200).redirect('/')
                    }
                })
            }
        })
    },
    getArticles: (req, res) => {
        UserModel.find({}, (err, users) => {
            if (err) {
                res.status(500).send(err)
            }
            else {
                if (!users) {
                    res.status(404).send('Aucun user trouvé')
                }
                ArticleModel.find({}, (err, articles) => {
                    if (err) {
                        res.status(500).render('error', {
                            message: 'Error when getting articles',
                            error: err.message
                        })
                    } else {
                        res.status(200).render('articles', {
                            message: 'Articles retrieved',
                            articles,
                            users
                        })
                    }
                })
            }
        })
        
    },
    getArticleById: async(req,res) => {
        const article = await ArticleModel.findById(req.params.id).populate('user')
      
        return res.status(200).render('article',{article})
    },
    updateArticle: (req, res) => {
        ArticleModel.findByIdAndUpdate(req.params.id, req.body, (err, articles) => {
            res.json({
                articles
            })
        })
    },
    deleteArticle: (req, res) => {
        ArticleModel.findByIdAndDelete(req.params.id, (err, articles) => {
            res.json({
                articles
            })
        })
    }
}