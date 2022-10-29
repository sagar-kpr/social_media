const User = require('../models/user_schema');

module.exports.createChat = async function(req,res){
    let user = await User.findById(req.query.id)
    let local = req.user.id
    if(req.xhr){
        return res.status(200).json({
            data: {
                user: user,
                local: local
            }
        })
    }
}