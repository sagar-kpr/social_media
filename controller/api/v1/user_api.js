const User = require('../../../models/user_schema');
const jwt = require('jsonwebtoken'); 
const env = require('../../../config/environment');

module.exports.session = async function(req,res){
    try{

        let user = await User.findOne({email:req.body.email});

        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message: 'invalid userName/Password'
            });
        }

        return res.status(200).json({

            message:'token created',
            data:{
                token : jwt.sign(user.toJSON(), env.jwt_secret , {expiresIn:'1000000'} )
            }

        });

    }catch(err){
        return res.status(500).json({
            message : 'internal error',
        });
    }
    
}
