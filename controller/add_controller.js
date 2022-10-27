
const User = require('../models/user_schema');


module.exports.addToggle = async function(req,res){
    let otherUser = await User.findById(req.query.id);
    let localUser = await User.findById(req.user.id)
    let user = await User.find({});
    console.log('qq',otherUser)
    localUser.friends.push(otherUser);
    otherUser.friends.push(localUser);
    //console.log('other',otherUser)
    otherUser.save()
    localUser.save()


    if(req.xhr){
        return res.status(200).json({
            data:{
                otherUser: otherUser
            },
            message : 'users added'
        })
        
    }
    return res.redirect('back');

}