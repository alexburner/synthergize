// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()) {
		return next();
	}

	// if they aren't, redirect them to splash
	res.redirect('/welcome');

}

// return route config function
module.exports = function (app, passport, express) {

	var router = express.Router();

	// -------------------------
	// WELCOME 
	// -------------------------
	router.get('/welcome', function (req, res) {
		res.render('welcome.ejs'); // load the index.ejs file
	});

	// -------------------------
	// LOGIN
	// -------------------------

	// show the login form
	router.get('/login', function (req, res) {
		// render the page and pass in any flash data if it exists
		res.render('UserAuth/login.ejs', { 
			message: req.flash('loginMessage') 
		});
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/', // pass to angular
		failureRedirect: '/login',
		failureFlash: true
	}));
	
	// -------------------------
	// SIGNUP
	// -------------------------

	// show the signup form
	router.get('/signup', function (req, res) {
		// render the page and pass in any flash data if it exists
		res.render('UserAuth/signup.ejs', { 
			message: req.flash('signupMessage') 
		});
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		// redirect to the secure profile section
		successRedirect: '/profile',
		// redirect back to the signup page if there's an error
		failureRedirect: '/signup',
		// allow flash messages
		failureFlash: true
	}));
	
	// -------------------------
	// PROFILE
	// -------------------------

	// we want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	router.get('/profile', isLoggedIn, function (req, res) {
		res.render('profile.ejs', { 
			// get the user out of session and pass to template
			user: req.user 
		});
	});

	// -------------------------
	// LOGOUT
	// -------------------------
	
	router.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	// -------------------------
	// ANGULAR
	// -------------------------
	
	// protected, catch all
	// if route is not explicitly handled, we assume its for angular
	// ***We will handle all HTML through EJS files***
	router.get('*', isLoggedIn, function (req, res) {
		// load our angular index
		res.render('UserProfile/index.ejs');
	});

	// -------------------------
	// ADD ROUTER TO EXPRESS
	// -------------------------
	app.use('/', router);

};