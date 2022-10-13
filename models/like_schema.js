const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
    },
    likeable : {
        type: mongoose.Schema.ObjectId,
        required : true,
        refPath : 'onModel'
    },
    onModel : {
        type: String,
        required: true
    }

},{
    timestamps: true
});


const Like = mongoose.model('Like', likeSchema);

module.exports = Like;