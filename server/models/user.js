var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique : true,
		dropDups: true
	},
	name:{
		first:{
			type: String,
			required: true
		},
		last:{
			type: String,
			required: true
		}
	},
	email:{
		type: String,
		required: true,
		unique : true,
		dropDups: true
	},
	password:{
		type: String,
		required: true
	},
	login:{
		type: Boolean,
		default: false	
	},
	role:{
		type: String, 
        required: true
	}
});

// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);