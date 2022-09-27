const Post = require('../../../models/post_schema');
const Comment  =require('../../../models/comment_schema');

module.exports.index = async function(req,res){
    let post = await Post.find({}).sort('createdAt').populate('user').populate({
        path:'comment',
        populate : {
            path: 'user'
        }
    });


    return res.status(200).json({
        message:'list of posts',
        post:post
    });
}



module.exports.delete = async function(req,res){
    let post = await Post.findById(req.body.params);
    post.remove();
    await Comment.deleteMany({post:req.body.id});

    return res.status(200).json({
        message:'post deleted'
    });
}