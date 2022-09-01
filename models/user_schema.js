const mongoose = require('mongoose');
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
});

const User = mongoose.model('User', schema);

module.exports = User;