const User = require('../models/user_schema');
const Post = require('../models/post_schema');

module.exports.home = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/profile');
    }
    return res.render('home');
    
}

module.exports.login = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/profile');
    }
    return res.render('login');
}

module.exports.profile = function(req,res){
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
        return res.render('profile', {
            posts:post
        });
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

                return res.redirect('/login');
            })
        }else{
            return res.redirect('back');
        }
        
    });

}

module.exports.session = function(req,res){
    return res.redirect('/profile');
}

module.exports.destroy = function(req,res){
    req.logout(function(err,user){
        if(err) { console.log('error in logout'); return}
        return res.redirect('/login');
    });
}
