 /* eslint no-console: "off" */
/* eslint no-undef: "off" */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config/config.js');
const documents = require('./server/routes/document');
const roles = require('./server/routes/role');
const users = require('./server/routes/user');

const app = express();
app.set('Secret', config.secret);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const port = process.env.PORT || 5000;
mongoose.Promise = global.Promise;
mongoose.connect(config.db, (err) => {
  if (err) {
    console.log('Error in connecting to mongodb');
  }
});


app.use('/api', users);
app.use('/api', documents);
app.use('/api', roles);

app.listen(port, onStart = (err) => {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://127.0.0.1:%s/ ', port, port);
});

module.exports = app;
