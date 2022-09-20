const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = '/uploads/users/avatar';


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
    }

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

//static method
schema.statics.uploadedAvatar = multer({storage : storage}).single('avatar');
schema.statics.avatarPath = AVATAR_PATH;


const User = mongoose.model('User', schema);

module.exports = User;