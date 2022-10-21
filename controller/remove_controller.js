const User = require('../models/user_schema');

module.exports.removeToggle = async function(req,res){
    console.log('okkkk**',req.query.id)
    /*let otherUser = await User.findById(req.query.id);
    let localUser = await User.findById(req.user.id)
    let user = await User.find({});
    
    localUser.friends.filter(check)
    otherUser.friends.filter(check2);
    function check(person){
        return person != otherUser.id
    }

    function check2(person){
        return person != localUser.id
    }
    console.log('other',otherUser)
    console.log('local',localUser)
    //otherUser.save()
    //localUser.save()
    if(req.xhr){
        return res.status(200).json({
            data:{
                otherUser: otherUser
            },
            message : 'users added'
        })
        
    }
    return res.redirect('back');*/

    
}