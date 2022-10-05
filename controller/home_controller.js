const User = require('../models/user_schema');
const Post = require('../models/post_schema');
const fs = require('fs');
const path = require('path');

module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }
    return res.render('signup');
    
}

module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err,user){
        console.log('.....w',user);
        return res.render('profile',{
            thatUser: user
        });
    });
    
}

module.exports.login = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }
    return res.render('login');
}

module.exports.home = async function(req,res){
    try{
        let post = await Post.find({})
        .sort('createdAt')
        .populate('user')
        .populate({
            path: 'comment',
            populate : {
                path: 'user'
            }
        });

        let user = await User.find({});
        
        return res.render('home', {
            posts:post,
            users: user
        });
    }catch(err){
        console.log('error', err);
    }
}



module.exports.create = async function(req,res){
    if(req.body.password != req.body.confirm){
        return res.redirect('back');
    }
    try{
        let userFind = await User.findOne({email:req.body.email});
      
        if(!userFind){
            await User.create(req.body);
            req.flash('success', "Sign up successfully ");
            return res.redirect('/');
        }else{
            req.flash('error', "User already exits ")
            return res.redirect('back');
        }

    }catch(err){
        console.log('error', err);
    }
}

module.exports.session = function(req,res){
    req.flash('success', "loged in successfully ")
    return res.redirect('/home');
}

module.exports.destroy = function(req,res){
    req.logout(function(err,user){
        if(err) { console.log('error in logout'); return}
        req.flash('success', "loged out successfully ")
        return res.redirect('/');
    });
}

module.exports.change = async function(req,res){
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);

            User.uploadedAvatar(req, res, function(err){
                if(err) { 
                    console.log('error in multer',err); 
                    return;
                 }
                 
                console.log(req.files); 
                user.first = req.body.first;
                user.last = req.body.last;

                if(req.files){
                    
                    user.avatar = User.avatarPath + '/' + req.files['avatar'][0].filename;
                }

                user.save();
                return res.redirect('back');
            });

        }catch(err){
            console.log(err)
        }

    }else {
        return res.status(401).send('unauthorized');
    }
}    

module.exports.change2 = async function(req,res){
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);

            User.uploadedAvatar(req, res, function(err){
                if(err) { 
                    console.log('error in multer',err); 
                    return;
                 }
                 
                console.log('00000',req.files['avatar2'][0]);  

                if(req.files){
                    user.avatar2 = User.avatarPath + '/' + req.files['avatar2'][0].filename;
                }

                user.save();
                return res.redirect('back');
            });

        }catch(err){
            console.log(err)
        }

    }else {
        return res.status(401).send('unauthorized');
    }
}    