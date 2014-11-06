// set up =================================================
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// configuration =================================================

// SO WEIRD pass passport for configuration
require('./config/passport')(passport);


// set up our express application

// log every request to console
app.use(morgan('dev')); 
// read cookies (needed for auth)
app.use(cookieParser());
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up for ejs templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash 

// routes =================================================

// set the static files location (ex: /public/img will be /img for users)
app.use(express.static(__dirname + '/client'));

// load our routes and pass in our app and configured passport
require('./app/routes.js')(app, passport, express);

app.use(function (hi, hello, next) {
	console.log('made it past routes');
	next();
});

// launch =================================================
app.listen(port);
console.log('The magic happens on port ' + port);