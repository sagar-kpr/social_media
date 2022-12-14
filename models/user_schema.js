const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = '/upload/user/avatar';


const schema = new mongoose.Schema({
    first:{
        type: String,
        required: true
    },
    last:{
        type: String,
        required: true
    },
    age:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique : true
    },
    password:{
        type: String,
        required: true
    },
    avatar : {
        type: String
    },
    avatar2 : {
        type: String

    },
    friends : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Friendship'
    }]
},{
    timestamps: true
});


let storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, path.join(__dirname, '..' , AVATAR_PATH));
    },
    filename : function(req , file , cb){
        cb(null, file.fieldname + '-' + Date.now());

    }
});

//static method for multi photos add (it access with req.files)
schema.statics.uploadedAvatar = multer({storage : storage}).fields([{name:'avatar', maxCount :1}, {name: 'avatar2', maxCount:1}])

//static method for single photo add (it access with req.file)
//schema.statics.uploadedAvatar = multer({storage : storage}).single('avatar');

schema.statics.avatarPath = AVATAR_PATH;


const User = mongoose.model('User', schema);

module.exports = User;