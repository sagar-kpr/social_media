const User = require('../models/user_schema');
const Post = require('../models/post_schema');

module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }
    return res.render('signup');
    
}
module.exports.profile = function(req,res){
    return res.render('profile');
}

module.exports.login = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }
    return res.render('login');
}

module.exports.home = function(req,res){
    Post.find({})
    .populate('user')
    .populate({
        path: 'comment',
        populate : {
            path: 'user'
        }
    })
    .exec(function(err,post){
        if(err) { console.log('finding in post'); return }
        User.find({}, function(err,user){
            return res.render('home', {
                posts:post,
                users: user
            });
        })
    });    
}



module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email}, function(err,user){
        if(err) { console.log('error finding user in create'); return }
        if(!user){
            User.create(req.body, function(err,user){
                if(err) { console.log('error finding user create2'); return }

                return res.redirect('/');
            })
        }else{
            return res.redirect('back');
        }
        
    });

}

module.exports.session = function(req,res){
    return res.redirect('/home');
}

module.exports.destroy = function(req,res){
    req.logout(function(err,user){
        if(err) { console.log('error in logout'); return}
        return res.redirect('/');
    });
}
