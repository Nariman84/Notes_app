var mongoose = require("mongoose");
var moment = require("moment");
var Schema = mongoose.Schema;
var User = require("./users");
var noteSchema = new Schema({
	_id: Schema.Types.ObjectId,
	note_name: {
		type: String
		// required: true,
		// unique: true
	},
	note_theme: String,
	content: String,
	created: { 
		type: Date,
		default: Date.now
	},
	
	author: [{
		type: Schema.Types.ObjectId,
		ref: "users"
	}]
}, {
	toJSON: {virtuals: true}
});

noteSchema.virtual("created_format_date").get(function() {
	return moment(this.created).format("DD.MM.YYYY HH:mm:ss");
});

var Note = mongoose.model("notes", noteSchema);
module.exports = Note;