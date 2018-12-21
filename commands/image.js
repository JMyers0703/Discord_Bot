const google = require('../util/google');

exports.run = (config, client, message, args) => {
    google.image(config, client, message, args);
}