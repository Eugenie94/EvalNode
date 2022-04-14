const express = require('express');

const userController = require('../Controllers/userController');
const articleController = require('../Controllers/articleController');

exports.router = (function() {
    const router = express.Router()

    // User
    router.get('/users', userController.users);
    router.post('/user', userController.addUser);
    router.get('/user/:id', userController.user);
    router.delete('/user/:id', userController.deleteUser);
    router.put('/user/:id', userController.updateUser);
    
    // Article
    router.get('/', articleController.article);
    router.post('/', articleController.addArticle);
    router.get('/article/:id', articleController.getArticleById);
    router.delete('/article/:id', articleController.deleteArticle);
    router.put('/article/:id', articleController.updateArticle);

    return router
})()