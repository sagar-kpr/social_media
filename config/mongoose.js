const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/facebook');
//mongoose.connect('mongodb://localhost/social_development');
const db = mongoose.connection;

db.on('error', console.error.bind(console,"error while connecting db"));

db.once('open', () => {
    console.log('database conected');
})