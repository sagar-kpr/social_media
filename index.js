const express = require('express');
const env = require('./config/environment');
const app = express();
require('./config/view_helper')(app);
const logger = require('morgan');
const db = require('./config/mongoose');
const port = process.env.PORT  ;
const parser = require('body-parser');
const layout = require('express-ejs-layouts');
const passport = require('passport');
const passport_local = require('./config/passport_local');
const passport_jwt = require('./config/passport_jwt');
const passport_google = require('./config/passport_google');
const sassMiddlware = require('node-sass-middleware'); 
const session = require('express-session');
const mongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMiddlware = require('./config/middleware');
const path = require('path');
const chatServer = require('http').Server(app);
const chatSocket = require('./config/chat_server').chatserver(chatServer);
chatServer.listen(5000);
console.log('chat server is running on port 5000');


//for node-sass-middleware
if(env.name = 'development'){
    app.use(sassMiddlware({
        src: path.join(__dirname, env.assets_path, 'scss'),
        dest:  path.join(__dirname, env.assets_path, 'css'),
        outputStyle: 'expanded',
        prefix: '/css'
    }));

}




//for parsing incoming request bodies
app.use(parser.urlencoded({extended:false}));

//for file uploading
app.use(express.static(env.assets_path));
app.use('/upload', express.static(__dirname + '/upload'));

app.use(logger(env.morgan.mode, env.morgan.options));



//for using layouts
app.use(layout);


//set ejs file
app.set('view engine', 'ejs');
app.set('views', './views');

//set  layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//for session and passport and connect-mongo
app.use(session({
    name:'social_media',
    secret: process.env.KEY || 'kisjsj',
    saveUninitialized: false,
    resave: false,
    outputStyle: 'expended',
    cookie: {
        maxAge: (1000*60*200)
    },
    store: mongoStore.create({
        mongoUrl : process.env.MONGODB_URL || `mongodb://localhost/${env.db}`,
        //mongoUrl: `mongodb://localhost/${env.db}`,
        autoRemove:'disabled',
    })
}));

// for initializing passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//flash use after passport session
app.use(flash());
app.use(customMiddlware.setFlash);

//for using routes
app.use('/', require('./routes/index'));

//for listening port
app.listen(port, (err) => {
    if(err) { console.log('error in listening port'); return }
    console.log('connected to express');
});
