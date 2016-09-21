const bcrypt = require('bcrypt-nodejs');

const fakeUser = [
  {
    username: 'User1',
    name: {
      first: 'User1firstname',
      last: 'User1lastname',
    },
    email: 'User1firstname@example.com',
    password: bcrypt.hashSync('User1', bcrypt.genSaltSync(8), null),
    role: 'Admin',
  },
  {
    username: 'User2',
    name: {
      first: 'User2firstname',
      last: 'User2lastname',
    },
    email: 'User2firstname@example.com',
    password: bcrypt.hashSync('User2', bcrypt.genSaltSync(8), null),
    role: 'User',
  },
  {
    username: 'User3',
    name: {
      first: 'User3firstname',
      last: 'User3lastname',
    },
    email: 'User3firstname@example.com',
    password: bcrypt.hashSync('User3', bcrypt.genSaltSync(8), null),
    role: 'User',
  },
  {
    username: 'User4',
    name: {
      first: 'User4firstname',
      last: 'User4lastname',
    },
    email: 'User4firstname@example.com',
    password: bcrypt.hashSync('User4', bcrypt.genSaltSync(8), null),
    role: 'User',
  },
  {
    username: 'User5',
    name: { first: 'User5firstname',
    last: 'User5lastname',
    },
    email: 'User5firstname@example.com',
    password: bcrypt.hashSync('User5', bcrypt.genSaltSync(8), null),
    role: 'Admin',
  },
];

module.exports = fakeUser;
