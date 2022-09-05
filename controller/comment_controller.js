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

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id, function(err,comment){
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId, { $pull : {comment: req.params.id}}, function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });

    

}