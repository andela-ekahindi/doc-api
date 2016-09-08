var seeder = require('mongoose-seeder'),
    data = require('./users.json');

seeder.seed(data, {dropCollections: true}).then(function(err, docs) {
    console.log("Here bitches");
    console.log(docs.users.User1);
}).catch(function(err) {
    throw err;
});