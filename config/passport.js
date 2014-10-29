var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');

module.exports = function (passport) {

	// ---------------------------------------------------
	// passport session setup
	// ---------------------------------------------------
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session
	
	// used to serialize the user for the session
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	// ---------------------------------------------------
	// local signup
	// ---------------------------------------------------
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called "local"
	
	passport.use('local-signup', new LocalStrategy({
		// by default, local strategy uses username and password
		// we will override with email
		usernameField: 'email',
		passwordField: 'password',
		// allows us to pass the entire request to the callback
		passReqToCallback: true
	},
	function (req, email, password, done) {

		// asynchronous
		// User.findOne won't fire unless data is sent back
		process.nextTick(function () {

			User.findOne({ 'local.email': email }, function (err, user) {

				if (err) {
					return err;
				}

				// check to see if there's already a user with that email
				if (user) {
					return done(
						// err
						null, 
						// user
						false, 
						// info
						req.flash('signupMessage', 'That email is already taken.')
					);
				} else {

					// create new user
					var newUser = new User();

					// set local credentials
					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password);

					// save the user
					newUser.save(function (err) {
						if (err) {
							throw err;
						}
						return done(null, newUser);
					});

				}

			});

		});

	}));

	// ---------------------------------------------------
	// local login
	// ---------------------------------------------------
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called "local"
	
	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function (req, email, password, done) {

		// find a user whose email matches the one in the form
		// we're checking to see if user trying to login exists
		User.findOne({ 'local.email': email }, function (err, user) {

			if (err) {
				return done(err);
			}

			// if no user is found, return message
			if (!user) {
				return done(
					null,
					false,
					req.flash('loginMessage', 'No user found.')
				);
			}

			// if user is found but password is wrong
			if (!user.validPassword(password)) {
				return done(
					null,
					false,
					req.flash('loginMessage', 'Oops! Wrong password.')
				);
			}

			// all is well, return successful user
			return done(null, user);

		});

	}));

};