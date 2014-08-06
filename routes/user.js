module.exports = function(app,mongoose) {

	var UserModel = mongoose.model('users');

	//show all users
	app.all('/users', function(req,res) {
		UserModel.find({}, function(err, data) {
			res.render(appDir + '/views/user/index.html', {
				title: 'User List',
				users: data
			});
		});
	});

	//add a user
	app.get('/user/new', function(req,res) {
		res.render(appDir + '/views/user/user.html', {
			title: 'Add User',
		});
	});

	//edit  user
	app.get('/user/:id', function(req,res) {
		UserModel.find({_id: req.params.id}, function(err, data) {
			if(err)
				res.status(404).send('Not Found');

			res.render(appDir + '/views/user/user.html', {
				title: 'Edit User',
				user: data[0]
			});

		});
	});

	//save a user
	app.post('/user', function(req,res) {
		var user = new UserModel({name: req.body.name});
			user.save(function(err) {
				res.send(!err ? true : false);
			})
	});

	//update a user
	app.put('/user/:id', function(req,res) {
		UserModel.update({_id: req.params.id}, {$set: req.body}, function(err) {
			res.send(!err ? true : false);
		})
	});

	//delete a user
	app.delete('/user/:id', function(req,res) {
		UserModel.remove({_id: req.params.id}, function(err) {
			res.send(!err ? true : false);
		})
	});

};
