const User = require('../../../models/user_schema');
const jwt = require('jsonwebtoken'); 

module.exports.session = async function(req,res){
    try{
        let user = await User.findOne({email:req.body.email});

        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message: 'invalid userName/Password'
            });
        }

        return res.status(200).json({
            message : 'your token is genrated',
            token : jwt.sign(user.toJSON(), 'codial', {expiresIn : '1000000'} )
        });

    }catch(err){
        return res.status(500).json({
            message : 'internal error',
        });
    }
    
}
