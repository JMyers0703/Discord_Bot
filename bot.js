const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

var SelfReloadJSON = require('self-reload-json');
const config = new SelfReloadJSON("./config.json");

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

require("dotenv").config();

client.on('error', console.error);

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("message", message => {
  //ONLY LISTEN TO JESSE/SEAN ATM
  /*if (message.author.id != '77141456879362048'){
     if (message.author.id != '237763768728158208'){
         if (message.author.id != '309458436263772160'){
             if (message.author.id != '311323637925937152'){
			 }return;
         }
     }  
  }*/
    
  if (message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  // This is the best way to define args. Trust me.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  // The list of if/else is replaced with those simple 2 lines:
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(config, client, message, args);
  } catch (err) { console.log(err) }
  if(message.member.hasPermission("ADMINISTRATOR")){
      try {
        let adminFile = require(`./commands/admin/${command}.js`);
        adminFile.run(config, client, message, args);
      } catch (err) {} 
  }
    
});

client.login(process.env.TOKEN);
