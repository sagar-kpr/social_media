const Post = require('../models/post_schema');
const Comment = require('../models/comment_schema');

module.exports.create = async function(req,res){
    try{
        let post = await Post.findById(req.body.post);
        
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

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment : comments,
                        user: req.user
                    },
                    message: 'comment created'
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
   
    let comment = await  Comment.findById(req.params.id);
    if(comment.user == req.user.id){
        let postId = comment.post;
        comment.remove();
        let post = await Post.findByIdAndUpdate(postId, { $pull : {comment: req.params.id}});

        if(req.xhr){
            return res.status(200).json({
                data:{
                    commentId : comment
                },
                message: 'comment deleted'
            });
        }

        req.flash('error', 'Comment deleted successfully');
        return res.redirect('back');

    }else{
        let postId = comment.post;
        comment.remove();
        let post = await Post.findByIdAndUpdate(postId, { $pull : {comment: req.params.id}});

        if(req.xhr){
            return res.status(200).json({
                data:{
                    commentId : comment
                },
                message: 'comment deleted'
            });
        }
        req.flash('error', 'Comment deleted successfully');
        return res.redirect('back');


    }
    

    

}