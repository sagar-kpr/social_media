const Post = require('../models/post_schema');
const Comment = require('../models/comment_schema');



module.exports.create = async function(req,res){

    let post = await Post.create({
        content:req.body.content,
        user: req.user._id
    });

    if(req.xhr){
        
        return res.status(200).json({
            data: {
                post: post,
                user:req.user,
            },
            message: 'post created!',
            
        });
    }
    /*req.flash('success', 'Status posted successfully');
    return res.redirect('back');*/
    
}

module.exports.destroy = async function(req,res){
<<<<<<< HEAD
    let post = await Post.findById(req.params.id);

    if(post.user == req.user.id) {
        post.remove();
        let comment = await Comment.deleteMany({post:req.body.id});
        if(req.xhr){
            return res.status(200).json({
                data:{
                    postId : post.id
                },
                message: 'post deleted'
            });
        }
        req.flash('error', 'Status deleted successfully');
        return res.redirect('back');
    }else{
        return res.redirect('back');
    }

   
=======
    try{
        let post = await Post.findById(req.params.id); 
    
        if(post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({post:req.body.id});

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id : req.params.id
                    },
                    message: 'post deletd'
                });
            }
                    
            return res.redirect('back');

        }else{
            return res.redirect('back');
        }

    }catch(err){
        console.log('....',err);
    }
    
>>>>>>> 5766bd1e38727d1bd51b2412c53b169d8fa62f45
}


