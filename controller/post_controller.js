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
    
}