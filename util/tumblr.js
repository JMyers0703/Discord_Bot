var tumblr = require("tumblr");

async function image(config, client, message, args) {
    
    let searchMessage = await message.reply({embed: {
            color: 3447003,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            title: "Searching Tumblr..."
          }
        });
    
    var oauth = {
      consumer_key: config.TUMBLR_CONS_KEY,
      consumer_secret: config.TUMBLR_CONS_SECRET,
      token: config.TUMBLR_TOKEN,
      token_secret: config.TUMBLR_TOKEN_SECRET
    };
    
    var blog;
    if(message.content.split(" type:")[0].length > 7){
        blog = new tumblr.Blog(message.content.substring(8, message.content.length), oauth);
    }else{
        blog = new tumblr.Blog('setheverman.tumblr.com', oauth);
    }

    blog.photo({limit: 10}, function(error, response) {
      if(error) return console.log(error);
        var postNum = Math.floor(Math.random() * Math.floor(response.posts.length));
        var imgNum = Math.floor(Math.random() * Math.floor(response.posts[postNum].photos.length));

        searchMessage.edit({embed: {
            color: 9442302,
            title: response.posts[postNum].blog_name,
            description: response.posts[postNum].summary,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            "image": {
              "url": response.posts[postNum].photos[imgNum].original_size.url
            },
            "fields": [
              {
                "name": "Notes",
                "value": response.posts[postNum].note_count,
                "inline": true
              }
            ],
            timestamp: new Date(Date.parse(response.posts[postNum].date))
          }
        });
    });
}

async function video(config, client, message, args) {
    
    let searchMessage = await message.reply({embed: {
            color: 3447003,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            title: "Searching Tumblr..."
          }
        });
    
    var oauth = {
      consumer_key: config.TUMBLR_CONS_KEY,
      consumer_secret: config.TUMBLR_CONS_SECRET,
      token: config.TUMBLR_TOKEN,
      token_secret: config.TUMBLR_TOKEN_SECRET
    };
    
    var blog;
    if(message.content.split(" type:")[0].length > 7){
        blog = new tumblr.Blog(message.content.substring(8, message.content.length), oauth);
    }else{
        blog = new tumblr.Blog('setheverman.tumblr.com', oauth);
    }
    
    blog.video({limit: 10}, function(error, response) {
      if(error) return console.log(error);
        var postNum = Math.floor(Math.random() * Math.floor(response.posts.length));
        var imgNum = Math.floor(Math.random() * Math.floor(response.posts[postNum].photos.length));

        console.log(response.posts);

        searchMessage.edit({embed: {
            color: 9442302,
            title: response.posts[postNum].blog_name,
            description: response.posts[postNum].summary,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            "image": {
              "url": response.posts[postNum].photos[imgNum].original_size.url
            },
            "fields": [
              {
                "name": "Notes",
                "value": response.posts[postNum].note_count,
                "inline": true
              }
            ],
            timestamp: new Date(Date.parse(response.posts[postNum].date))
          }
        });
    });
}

module.exports = { image, video };