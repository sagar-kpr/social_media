const User = require('../models/user_schema');
const passport = require('passport');
const jwt_strategy = require('passport-jwt').Strategy;
const extract_jwt = require('passport-jwt').ExtractJwt;

let opts = {
    jwtFromRequest: extract_jwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codial'
}

passport.use(new jwt_strategy(opts, function(jwtPayLoad, done){
    User.findById(jwtPayLoad._id, function(err,user){
        if(err) { console.log('error', err); return}

        if(user){
            return done(null,user);
        }else{
            return done(null, false)
        }
        
    });
}));


module.exports = passport;