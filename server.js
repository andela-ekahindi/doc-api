var express = require('express');


var app = express();
var port = process.env.PORT || 5000;

app.get('/', function (req, res) {
	res.send('Begin CheckPoint');
});

app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://127.0.0.1:%s/ ', port, port);
});

