const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user_schema');




passport.use(new googleStrategy({
    clientID: "594983700466-saoqqo9dbo1lh8b6sin8hflju1cf79le.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL : "http://localhost:8000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done){
        console.log('---',profile);
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err) { console.log('err in finding email'); return }

            if(user){
                return done(null, user);
            }else{
                User.create({
                    first: profile.name.givenName,
                    last: profile.name.familyName,
                    email: profile.emails[0].value,
                    age: '20',
                    password : crypto.randomBytes(20).toString('hex')
                }, function(err,user){
                    if(err) { console.log('err in finding email'); return }
                    return done(null, user);
                });
            }
        });
    }
));

