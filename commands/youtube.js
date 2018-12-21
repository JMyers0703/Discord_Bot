var search = require('youtube-search');

exports.run = (config, client, message, args) => {
    var opts = {
      maxResults: 25,
      key: config.YOUTUBE_KEY,
      type: "video"
    };

    search(message.content.substring(9, message.content.length), opts, function(err, results) {
      if(err) return console.log(err);
      var num = Math.floor(Math.random() * Math.floor(25));
        
      message.channel.send(results[num].link);
        
    });
}