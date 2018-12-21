const recipeSrch = require("../util/recipe");

exports.run = (config, client, message, args) => {
    recipeSrch.find(config, client, message, args);
}