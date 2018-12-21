const tumblr = require("../util/tumblr");

exports.run = (config, client, message, args) => {
    
    if(message.content.indexOf("type:") > -1){
        if(message.content.split("type:")[1].toLowerCase() == "video"){
            tumblr.video(config, client, message, args);
        }else{
            tumblr.image(config, client, message, args);
        }
    }else{
        tumblr.image(config, client, message, args);
    }
}