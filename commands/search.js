const google = require('../util/google');

exports.run = (config, client, message, args) => {
    console.log("search");
    google.search(config, client, message, args);
}