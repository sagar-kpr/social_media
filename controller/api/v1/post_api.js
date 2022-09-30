const Post = require('../../../models/post_schema');
const Comment = require('../../../models/comment_schema');

module.exports.index = async function(req,res){
    let post = await Post.find({})
        .sort('createdAt')
        .populate('user')
        .populate({
            path: 'comment',
            populate : {
                path: 'user'
            }
        });

    return res.status(200).json( {
        message: 'post api',
        posts: post
    });
}

module.exports.delete = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});
            return res.status(200).json({
                message:'post deleted'
            });

        }else{
            return res.status(401).json({
                message:'u r not authorized user'
            });
        }
    }catch(err){
        console.log('err');
        return res.status(500).json({
            message:'server error'
        });
    }
    
    
}

