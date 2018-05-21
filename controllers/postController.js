const mongoose = require('mongoose');
const moment = require('moment');
const Post = require('../models/post');

exports.findByUser = function(req, res, next){
    var username = req.params.username;
    Post.find({username: username})
        .sort([['time']])
        .exec(function(err, posts){
            if(err) return next(err);
            res.json(posts);
        });
}

exports.createPost = function(req, res, next){
    var post = new Post({
        username: req.body.username,
        content: req.body.content,
        image: req.body.image,
        time: req.body.time
    });

    post.save().then(function(data){
        res.json(data);
    }).catch(function(err){
        if(err) return next(err);
    });
};

