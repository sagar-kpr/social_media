const User = require('../models/user_schema');

module.exports.home = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err,user){
            if(err) { console.log('error finding user in home'); return } 
            if(user){
                return res.redirect('/profile');
            }else{
                return res.render('home');
            }
        })
    }else{
       return res.render('home');
    }
    
}

module.exports.login = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err,user){
            if(err) { console.log('error finding user login'); return } 
            if(user){
                return res.redirect('/profile');
            }else{
                return res.render('login');
            }
        })
    }else{
       return res.render('login');
    }
}

module.exports.profile = function(req,res){
    return res.render('profile');
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
    User.findOne({email: req.body.email}, function(err,user){
        if(err) { console.log('error finding user in session'); return }

        if(user){
            if(req.body.password != user.password){
                return res.redirect('back');
            }
            res.cookie('user_id', user.id);
            return res.redirect('/profile');
            
        }else{
            return res.redirect('back');
        }
    })
}

module.exports.destroy = function(req,res){
    res.clearCookie('user_id');
    return res.redirect('/login');
}
