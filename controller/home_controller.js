const User = require('../models/user_schema');
const Post = require('../models/post_schema');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');



module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }
    return res.render('signup');
    
}

module.exports.profile = async function(req,res){
    let allUsers = await User.find({})
    User.findById(req.params.id, function(err,user){
        return res.render('profile',{
            thatUser: user,
            users: allUsers
        });
    });
    
}

module.exports.friends = async function(req,res){
    let user = await User.find({})
        return res.render('friends', {
            users: user
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
            path : 'comment',
            populate : {
                path :'user'
            }
        })
        .populate('likes')
       
        let user = await User.find({})
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


//LOGIN PAGE METHODS
module.exports.session = function(req,res){
    req.flash('success', "loged in successfully ")
    return res.redirect('/home');
}

module.exports.forgot = function(req,res){
    return res.render('identity');
}

//FIND EMAIL METHODS
module.exports.resetPassword = function(req,res){
    User.findOne({email: req.body.findEmail},function(err,user){
        if(err){
            console.log('err in finding email', err);
            return;
        }
        if(user){
            req.flash('success', ' Change Password Now! ');
            return res.render('changePassword',{
                userEmail:user

            });

        }else{
            req.flash('error', 'Email id not exits');
            return res.redirect('back');
        }
    })
}

module.exports.getPassword = function(req,res){
    return res.render('changePassword');
}

//CHANGE PASSWORD METHOd

module.exports.changePassword = function(req,res){
    if(req.body.newPassword == req.body.confirmNewPassword){
       
        User.findOne({email:req.params.id}, function(err,user){
            if(user){
                user.password = req.body.newPassword;
                user.save();
                req.flash('success', 'Password Changed Successfully!');
                return res.redirect('/');
            }else{
                req.flash('error', "did'nt find user");
                return res.redirect('back');
            }
        });
        
    }else{
        req.flash('error', "did'nt match");
        return res.redirect('/identity')
    }
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

                    /*if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }*/

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