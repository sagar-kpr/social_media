const User = require('../models/user_schema');
const Post = require('../models/post_schema');

module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }
    return res.render('signup');
    
}

module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err,user){
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
            return res.redirect('/');
        }else{
            return res.redirect('back');
        }

    }catch(err){
        console.log('error', err);
    }
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

module.exports.change = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
            return res.redirect('back');
        } );
    } else {
        return res.status(401).send('unauthorized');
    }
}