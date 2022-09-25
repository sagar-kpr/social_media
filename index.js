const express = require('express');
const app = express();
const db = require('./config/mongoose');
const port = 8000;
const parser = require('body-parser');
const layout = require('express-ejs-layouts');
const passport = require('passport');
const passport_local = require('./config/passport_local');
const sassMiddlware = require('node-sass-middleware'); 
const session = require('express-session');
const mongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMiddlware = require('./config/middleware');

app.use(sassMiddlware({
    src: './assets/scss',
    dest: './assets/css',
    outputStyle: 'expanded',
    prefix: '/css'
}));

app.use(parser.urlencoded({extended:false}));

app.use(express.static('./assets'));
app.use('/upload', express.static(__dirname + '/upload'));


app.use(layout);


//set ejs file and layouts
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//use session and passport
app.use(session({
    name:'social_media',
    secret: 'kwality',
    saveUninitialized: false,
    resave: false,
    outputStyle: 'expended',
    cookie: {
        maxAge: (1000*60*200)
    },
    store: mongoStore.create({
        mongoUrl:'mongodb://localhost/social_development',
        autoRemove:'disabled',
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//flash use after passport session
app.use(flash());
app.use(customMiddlware.setFlash);


app.use('/', require('./routes/index'));

app.listen(port, (err) => {
    if(err) { console.log('error in listening port'); return }
    console.log('connected to express');
});
