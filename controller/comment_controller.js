const Post = require('../models/post_schema');
const Comment = require('../models/comment_schema');
const commentMailer = require('../mailers/comment_mailer');
const queue = require('../config/kue');
const commentWorker = require('../worker/comment_worker');

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
            comments  = await comments.populate('user','email');
            let job = queue.create('emails', comments).save(function(err){
                if(err){
                    console.log('err in creating queue', err);
                    return;
                }
                console.log('queue created :', job.id );
                
            });
            //commentMailer.newComment(comments);

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

// module.exports.create = function(req,res){
//     Post.findById(req.body.post,function(err,post){
//         if(post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             },function(err, comment){
//                 if(err){
//                     // console.log('error in adding comments');
//                     req.flash('error',err);
//                     return;
//                 }
//                 post.comment.push(comment);
//                 post.save();
//                 comment.populate('user', 'name email');
//                 // commentsMailer.newComment(comment)// we are calling newComment

//                 let job = queue.create('emails',comment).save(function(err){ // comment I am going to send in the email
//                     if(err){
//                         console.log('error in sending to the queue',err);
//                         return;
//                     }

//                     console.log('job enqueued',job.id);
//                 });
//                 req.flash('success','Comment created!')

//                 res.redirect('/');
//             });
//         }
//     });
// }



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