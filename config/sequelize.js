module.exports = function (Sequelize) {
	
	// note postgres user added via instructions
	// http://postgresguide.com/setup/users.html

	var sequelize = new Sequelize(
		'synthergizedb',
		'root',
		'root', 
		{
			dialect: 'postgres',
			port:    5432,
		}
	);
	 
	sequelize
		.authenticate()
		.complete(function(err) {
			if (!!err) {
				console.log('Unable to connect to the database:', err);
			} else {
				console.log('Connection has been established successfully.');
			}
		});

	return sequelize;
};