const User = require('../../../models/user_schema');
const jwt = require('jsonwebtoken');


module.exports.session = async function(req,res){
    try{
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message: 'invalid Username/Password'
            });
        }

        return res.status(200).json({
            message:'token created',
            data:{
                token : jwt.sign(user.toJSON(), 'social', {expiresIn:'100000'} )
            }
            
        });

    }catch(err){
        return res.status(500).json({
            message: 'internal server error'
        });
    }
    
}