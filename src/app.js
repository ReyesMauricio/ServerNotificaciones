const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars')
const path = require('path')

const app = express();
//bd de firebase
const {db} = require('./firebase')

//settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'));


app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', '.hbs')

//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))

//routes
app.use(require('./routes/index.js'))

//static files
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;



