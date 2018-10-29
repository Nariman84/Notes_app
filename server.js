
// подключение express
var express = require("express");

// создаем объект приложения
var app = express();
var bodyParser = require("body-parser");

var session = require("express-session");
var cookieParser = require("cookie-parser");
var mongoClient = require("mongodb").MongoClient;

var mongoose = require("mongoose");
var mustacheExpress = require('mustache-express');
mongoose.connect("mongodb://localhost:27017/usersdb", {useNewUrlParser: true});
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.engine('mustache', mustacheExpress());

var url = "mongodb://localhost:27017/usersdb";
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
var MongoStore = require("connect-mongo")(session);
app.use(session({
	secret: "keyboard cat",
	key: "sid",
	cookie: {
		path: "/",
		httpOnly: true,
		maxAge: null
	},
	store: new MongoStore({
		mongooseConnection: mongoose.connection
	}),
	resave: false,
	saveUninitialized: false
}));

app.use(require("./middleware/loadUser"));

app.use(express.static(__dirname + "/public"));
require('./routes/index_templates.js')(app);

app.use(function(request, response, next) {
	response.status(404);
	response.sendFile(__dirname + '/public/404.html');
});

// начинаем прослушивать подключения на 8080 порту
app.listen(8080, function(){
	console.log('Server running on 8080');
});

