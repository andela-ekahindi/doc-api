var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
var port = process.env.PORT || 5000;

app.get('/', function (req, res) {
	res.json({"message" :'Begin CheckPoint', "error":false});
});

app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://127.0.0.1:%s/ ', port, port);
});

module.exports = app;
