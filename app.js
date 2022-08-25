const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');
const path = require('path');
const passport = require('passport');
const session = require('express-session')

//Load Config
dotenv.config({ path: './config/config.env' })

//Passport Config
require('./config/passport')(passport)
connectDB();

const app = express();

// Logging -> during development we can log requests to terminal
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// Handlebars

app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs');
app.set('views', "./views");

//session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//create static folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})