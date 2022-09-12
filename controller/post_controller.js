const Post = require('../models/post_schema');
const Comment = require('../models/comment_schema');
const Likes = require('../models/likes_schema');


module.exports.create = async function(req,res){
    try{
        let post = await Post.create(
            {
                content:req.body.content,
                user: req.user._id
            }  
        );

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post: post
                },
                message : 'posted created'
            })
        }
              
        req.flash('success', 'Status posted successfully');
        return res.redirect('back');  

    }catch(err){
        console.log('error');
    }
      
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
