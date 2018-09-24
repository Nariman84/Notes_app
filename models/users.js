var crypto = require("crypto");
var mongoose = require("mongoose");
var util = require("util");
var async = require("async");

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

userSchema.statics.authorize = function(email, password, callback) {
	var User = this;
	async.waterfall([
		function(callback) {
			User.findOne({email: email}, callback);
		},
		function(user, callback) {
			if (user) {
				if (user.checkPassword(password)) {
					callback(null, user);
				} else {
				callback (new AuthError("Пароль неверный!"));
				}
			} else {
				console.log("user не найден. повторите ввод логина и пароля");
			}
		}
	], callback);
};

function AuthError (message) {
	Error.apply (this, arguments);
	Error.captureStackTrace (this, AuthError);
	this.message = message;
};

util.inherits(AuthError, Error);
AuthError.prototype.name = "AuthError";
exports.AuthError = AuthError;

var User = mongoose.model("users", userSchema);
module.exports = User;
exports.AuthError = AuthError;