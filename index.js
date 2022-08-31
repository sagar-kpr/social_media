const express = require('express');
const app = express();
const db = require('./config/mongoose');
const port = 8000;
const parser = require('body-parser');
const layout = require('express-ejs-layouts');

app.use(express.static('./assets'));
app.use(parser.urlencoded({extended:false}));
app.use(layout);

//set ejs file and layouts
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use('/', require('./routes/index'));

app.listen(port, (err) => {
    if(err) { console.log('error in listening port'); return }

    console.log('connected to express');
});
