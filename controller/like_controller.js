
const Post = require('../models/post_schema');
const Comment = require('../models/comment_schema');
const Like = require('../models/like_schema');


module.exports.toggleLike = async function(req,res){
    try{
        let liked;
        let deleted = false;
    
        if(req.query.type == 'Post'){
            liked = await Post.findById(req.query.id).populate('likes');
        }else{
            liked = await Comment.findById(req.query.id).populate('likes');   
        }
    
        let exitingLike = await Like.findOne({
            user:req.user._id,
            likeable:req.query.id,
            onModel: req.query.type
        });
    
        if(exitingLike){
            liked.likes.pull(exitingLike._id);
            liked.save();
            exitingLike.remove();
            deleted = true;
        }else{
            let newLike = await Like.create({
                user:req.user._id,
                likeable:req.query.id,
                onModel: req.query.type
            });
    
            liked.likes.push(newLike._id);
            liked.save();
        }
    
        return res.status(200).json({
            message : 'success',
            data: {
                deleted:deleted
            }
        });
    
    }catch(err){
        return res.status(500).json({
            message: 'internal error'
        });
    }
    
    
    
}
>>>>>>> 0e397e8e4a2ea1710c35938499e3cea788b66f50
