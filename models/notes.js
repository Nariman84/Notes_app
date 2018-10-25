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

noteSchema.virtual("createdFormatDate").get(function() {
	return moment(this.created).format("DD.MM.YYYY HH:mm:ss");
});

noteSchema.virtual("diff_Time").get(function() {
	var diffTime = new Date(Date.now() - this.created.getTime());
	var epoch = new Date(0);
	var diffHours;
	var diffMinutes;
	var diffSeconds;



	diffYears = Math.floor(diffTime.getFullYear() - epoch.getFullYear());

	if (epoch.getMonth() > diffTime.getMonth()) {
		diffMonth = Math.floor(diffTime.getMonth() - epoch.getMonth() + 12);
		diffYears -= 1;
	} else {
		diffMonth = Math.floor(diffTime.getMonth() - epoch.getMonth());
	}

	if (epoch.getMonth() > diffTime.getMonth()) {
		diffDate = Math.floor(diffTime.getDate() - epoch.getDate() + 31);
		diffMonth -= 1;
	} else {
		diffDate = Math.floor(diffTime.getDate() - epoch.getDate());
	}

	var diffHours;
	var diffMinutes;
	var diffSeconds;

	diffHours = Math.floor(diffTime.getHours() - epoch.getHours());
	if (epoch.getHours() > diffTime.getHours()) {
		diffHours = Math.floor(diffTime.getHours() - epoch.getHours() + 24);
		diffDate -= 1;
	} else {
		diffHours = Math.floor(diffTime.getHours() - epoch.getHours());
	}
	diffMinutes = Math.floor(diffTime.getMinutes() - epoch.getMinutes());
	diffSeconds = Math.floor(diffTime.getSeconds() - epoch.getSeconds());
// console.log(diffTime.getDate());
// console.log(epoch.getDate());
	// var arrTime = [diffYears, diffMonth, diffDate, diffHours, diffMinutes, diffSeconds];
	// if (arrTime[0])
	// for (var i = 0; i < arrTime.length; i++) {
	// 	var time_passed = `Прошло ${arrTime[0]}л. ${arrTime[1]} мес. ${arrTime[2]}дн. ${arrTime[3]} ч. ${arrTime[4]} мин. ${arrTime[5]} сек.`;
	// 	if (arrTime[i] === 0) {
	// 		arrTime[i].remove
	// 	}
	// };
	// return time_passed;

	return `Прошло ${diffYears}г. ${diffMonth}мес. ${diffDate}дн. ${diffHours} ч. ${diffMinutes} мин. ${diffSeconds} сек.`;
	// console.log();
	
});


var Note = mongoose.model("notes", noteSchema);
module.exports = Note;