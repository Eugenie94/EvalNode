const express = require('express');

const userController = require('../Controllers/userController');
const articleController = require('../Controllers/articleController');

exports.router = (function() {
    const router = express.Router()

    // User
    router.get('/users', userController.users);
    router.post('/user', userController.addUser);
    router.get('/user/:id', userController.user);
    // router.get('/user/:id', userController.deleteUser);
    
    // Article
    router.get('/', articleController.article);
    router.post('/', articleController.addArticle);

    

    return router
})()