const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user_schema');
const env = require('./environment');



passport.use(new googleStrategy({
    clientID: env.google_client_id ,
    clientSecret: env.google_client_secret ,
    callbackURL : env.google_call_back_url
    },
    function(accessToken, refreshToken, profile, done){

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
                    password : crypto.randomBytes(20).toString('hex'),
                    profilePic : profile.photos[0].value 
                }, function(err,user){
                    if(err) { console.log('err in finding email'); return }
                    return done(null, user);
                });
            }
        });
    }
));

