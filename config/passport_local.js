const User = require('../models/user_schema');
const passport = require('passport');
const local = require('passport-local').Strategy;

passport.use(new local(
    {
    usernameField: 'email'
    },
    function(email, password, done){
        User.findOne({email:req.body.email}, function(err,user){
            if(err) { return done(err) }
            

        })

    }
    
))