const mongoose = require('mongoose');
const env = require('./environment');
mongoose.connect(`mongodb://localhost/${env.db}`);
//mongoose.connect('mongodb://localhost/social_development');
const db = mongoose.connection;

db.on('error', console.error.bind(console,"error while connecting db"));

db.once('open', () => {
    console.log('database conected');
})