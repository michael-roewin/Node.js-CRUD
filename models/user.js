module.exports = function(mongoose) {

	var userSchema = new mongoose.Schema({
		name: String
	});

	mongoose.model('users', userSchema);
}