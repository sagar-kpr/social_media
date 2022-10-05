const Post = require('../models/post_schema');
const Comment = require('../models/comment_schema');
const commentMailer = require('../mailers/comment_mailer');

module.exports.create = async function(req,res){
    try{
        let post = await Post.findById(req.body.post);
        console.log('+++',req.body);
        
        if(post){
            let comments = await Comment.create(
                {
                    content: req.body.content,
                    post : req.body.post,
                    user: req.user._id
                }
            );
            post.comment.push(comments);
            post.save();
            comments = await comments.populate('user', 'first email');
            console.log('comment', comments);
            commentMailer.newComment(comments);    
            if(req.xhr){
                return res.status(200).json({
                    data : {
                        post: post,
                        comment : comments,
                        user : req.user
                    },
                    message: 'coment created!'
                });
            }
            req.flash('success', 'Comment posted successfully');
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }

    }catch(err){
        console.log('error', err);
    }
}


module.exports.destroy = async function(req,res){
   try{
    let comment = await Comment.findById(req.params.id);
    if(comment.user == req.user.id){
        let postId = comment.post;
        comment.remove();
        await Post.findByIdAndUpdate(postId, { $pull : {comment: req.params.id}});
        if(req.xhr){
            return res.status(200).json({
                data: {
                    comment_id : req.params.id
                },
                message: 'comment deleted'
            });
        }
        req.flash('error', 'Comment deleted successfully');
        return res.redirect('back');
    }else{
        let postId = comment.post;
        comment.remove();
        await Post.findByIdAndUpdate(postId, { $pull : {comment: req.params.id}});
        if(req.xhr){
            return res.status(200).json({
                data: {
                    comment_id : req.params.id
                },
                message: 'comment deleted'
            });
        }
        req.flash('error', 'Comment deleted successfully');
        return res.redirect('back');
    

    }
   }catch(err){
    console.log(err);
   }
    
}