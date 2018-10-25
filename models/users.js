var crypto = require("crypto");
var mongoose = require("mongoose");
var util = require("util");


var Schema = mongoose.Schema;
var userSchema = new Schema({
	_id: Schema.Types.ObjectId,
	firstName: {
		type: String,
		required: true
	},
	lastName: String,
	email: {
		type: String,
		required: true,
		unique: true
	},
	hashedPassword: {
		type: String,
		required: true
	},
	salt: {
		type: String,
		required: true
	}
});

userSchema.methods.encryptPassword = function(password) {
	return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
};

userSchema.virtual("password")
	.set(function(password) {
		this._plainPassword = password;
		this.salt = Math.random() + "";
		this.hashedPassword = this.encryptPassword(password);
	})
	.get(function() { return this._plainPassword; });

userSchema.methods.checkPassword = function(password) {
	return this.encryptPassword(password) === this.hashedPassword;
};

var User = mongoose.model("users", userSchema);
module.exports = User;