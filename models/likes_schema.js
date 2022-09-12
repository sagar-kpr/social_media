const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    like: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    },

}, {
    timestamps:true
}
);

const Likes = mongoose.model('Likes', likeSchema);

module.exports = Likes;