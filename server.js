var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config/config.js');
var documents = require('./server/routes/document');
var roles = require('./server/routes/role');
var users = require('./server/routes/user');

var app = express();
app.set('Secret', config.secret); // secret variable
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


var port = process.env.PORT || 5000;
mongoose.Promise = global.Promise;
mongoose.connect(config.db, function (err) {
	if (err) {
		console.log('Error in connecting to mongodb');
	} else {
		console.log('You okay. Successful connection');
	}
});

app.get('/', function (req, res) {
	res.json({"message" :'Begin CheckPoint'});
});

app.use('/api', documents);
app.use('/api', roles);
app.use('/api', users);

app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://127.0.0.1:%s/ ', port, port);
});

module.exports = app;
