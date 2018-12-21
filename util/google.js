var google = require('google');


const cheerio = require('cheerio'),
      snekfetch = require('snekfetch'),
      querystring = require('querystring'),
      GoogleImages = require('google-images');


let setCookie = [];

async function search(config, client, msg, args) {
    
   let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(msg.content.substring(8, msg.content.length).replace(" ","%20"))}`;
   let searchMessage = await msg.reply({embed: {
            color: 3447003,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            title: "Searching...",
            url: searchUrl,
            description: "."
          }
        });
    
  google(msg.content.substring(8, msg.content.length).replace(" ","%20"), function (err, res){
      let googleData = res.$('.r').first().find('a').first().attr('href');
      googleData = querystring.parse(googleData.replace('/url?', ''));
      
      if(err || googleData.q == null){
        searchMessage.edit({embed: {
            color: 13632027,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            title: "No results found.",
            description: "."
          }
        });
      }else{
        searchMessage.edit({embed: {
            color: 9442302,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            fields: [{
                name: "Result",
                value: `[${msg.content.substring(8, msg.content.length)}](${googleData.q})`
              }
            ]/*,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Example"
            }*/
          }
        });
      }
  });
}

async function image(config, client, msg, args) {
   const imgclient = new GoogleImages(config.CSE_ID, config.API_KEY);
    
   let searchMessage = await msg.reply({embed: {
            color: 3447003,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            title: "Searching..."
          }
        });
    
  imgclient.search(msg.content.substring(7, msg.content.length), {safe: 'off'})
    .then(images => {
      var num = Math.floor(Math.random() * Math.floor(images.length));
      console.log(images[num]);
        searchMessage.edit({embed: {
            color: 9442302,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            "image": {
              "url": images[num].url
            }/*,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Example"
            }*/
          }
        });
    });
}

module.exports = { search, image };