const mongoose = require('mongoose');
const moment = require('moment');
const Post = require('../models/post');

const PAGE_SIZE = 100;

exports.findByUser = function(req, res, next){
    var username = req.params.username;
    Post.find({username: username})
        .sort([['time', 'descending']])
        .exec(function(err, posts){
            if(err) return next(err);
            res.json(posts);
        });
}

exports.findRecentPosts = function(req, res, next){
    var page = req.params.page;
    Post.find({}, {}, {skip: page * PAGE_SIZE, limit: PAGE_SIZE})
        .sort([['time', 'descending']])
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

exports.createPostComment = function(req, res, next){
    var comment = {
        username: req.body.username,
        content: req.body.content,
        time: req.body.time
    };

    var id = mongoose.Types.ObjectId(req.params.postId);

    Post.findOneAndUpdate({_id: id}, {$push : {comments: comment}}, {new: true})
        .then(function(data){
            res.json(data);
        }).catch(function(err){
            if(err) return next(err);
        });

};

exports.getPostComments = function(req, res, next){
    var id = mongoose.Types.ObjectId(req.params.postId);
   
    Post.findOne({_id: id}, {comments: true})
        .exec(function(err, data){
            if(err) return next(err);
            res.json(data);
        });
}

