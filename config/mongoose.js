const mongoose = require('mongoose');
const env = require('./environment');

//mongoose.connect(process.env.MONGODB_URL || `mongodb://localhost/${env.db}`);
mongoose.connect(`mongodb://localhost/${env.db}`);
const db = mongoose.connection;

db.on('error', console.error.bind(console,"error while connecting db"));

db.once('open', () => {
    console.log('database conected');
})