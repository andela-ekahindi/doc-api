const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  require('dotenv').load();
}

module.exports = {
  secret: 'codeninjaresdocmang',
  db: process.env.MONGODB_URL || 'mongodb://dama:dama@ds041536.mlab.com:41536/dama',
};
