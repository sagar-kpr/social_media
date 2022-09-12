const Post = require('../models/post_schema');
const Comment = require('../models/comment_schema');
const Likes = require('../models/likes_schema');


module.exports.create = function(req,res){
    Post.create(
        {
            content:req.body.content,
            user: req.user._id
        }, function(err,post){
            if(err) { console.log('erro creating post'); return }
            req.flash('success', 'Status posted successfully');
            return res.redirect('back');
    });
}

module.exports.destroy = function(req,res){
    Post.findById(req.params.id, function(err,post){
        if(post.user == req.user.id) {
            post.remove();
            Comment.deleteMany({post:req.body.id}, function(err){
                req.flash('error', 'Status deleted successfully');
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }

    });
}

module.exports.likes = function(req,res){
    Post.findById(req.params.id, function(err,post){
        if(post.user == req.user.id){
            return res.redirect('back');
        }
    });

}
