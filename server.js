//worked on with the respectable leonard constant and joshua findlay

let express  = require('express');
let app      = express();
let port     = process.env.PORT || 8080;

let mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

let passport = require('passport');
let flash    = require('connect-flash');

let morgan       = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser   = require('body-parser');
let session      = require('express-session');

let configDB = require('./config/database.js');

let db

mongoose.connect(configDB.url, (err, database) => {
  if (err) return console.log(err)
  db = database
  require('./app/routes.js')(app, passport, db);
}); 

require('./config/passport')(passport); 

app.use(morgan('dev')); 
app.use(cookieParser()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.set('view engine', 'ejs'); 

app.use(session({
    secret: 'rcbootcamp2021b', 
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

app.listen(port);
console.log(`http://localhost:${port}/`);
