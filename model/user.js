var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema
(
	{
		fname: String,
		lname: String,
		username: String,
		email: String,
	}
	//{
//		collection: 'User'
//	}
);

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);