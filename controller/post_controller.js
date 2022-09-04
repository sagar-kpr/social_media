const Post = require('../models/post_schema');
const Comment = require('../models/comment_schema');

module.exports.create = function(req,res){
    Post.create(
        {
            content:req.body.content,
            user: req.user._id
        }, function(err,post){
            if(err) { console.log('erro creating post'); return }

            return res.redirect('back');
    });
}

module.exports.destroy = function(req,res){
    Post.findById(req.params.id, function(err,post){
        if(post.user == req.user.id) {
            post.remove();
            Comment.deleteMany({post:req.body.id}, function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }

    });
}

