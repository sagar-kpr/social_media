const Post = require('../models/post_schema');
const Comment = require('../models/comment_schema');

module.exports.create = function(req,res){
    Post.findById(req.body.post, function(err,post){
        if(post){
            Comment.create(
                {
                    content: req.body.content,
                    post : req.body.post,
                    user: req.user._id
                }, function(err, comments){
                    
                    post.comment.push(comments);
                    post.save();
                    
                    res.redirect('/profile');
                }
            );

        }
    });
}