const User = require('../models/user_schema');
const passport = require('passport');
const local = require('passport-local').Strategy;

passport.use(new local(
    {
    usernameField: 'email'
    },
    function(email, password, done){
        User.findOne({email:email}, function(err,user){
            if(err) { return done(err) }
            if(user){
                if(user.password != password){
                    return done(null, false);
                }else{
                    return done(null, user);
                }
            }else{
                return done(null, false);
            }

        });

    }
    
));

//serialize is used to decide which data kept in session cookie of user
passport.serializeUser(function(user,done){
    return done(null,user.id);

});

//data sent back to browser using de-serialize
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err) { return done(err) }
        
        return done(null,user);
    });
});

//used as a middleware for controller's action
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/login');
}

//
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    return next();
}


module.exports = passport;


