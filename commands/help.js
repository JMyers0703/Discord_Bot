const basicCommands = './commands/',
      adminCommands = './commands/admin/',
      fs = require('fs');

exports.run = (config, client, message, args) => {

    fs.readdir(basicCommands, (err, files) => {
      files.filter(el => /\.js$/.test(el)).forEach(file => { 
            console.log("B " + file.split(".")[0]);
      });
    });
    
    fs.readdir(adminCommands, (err, files) => {
      files.filter(el => /\.js$/.test(el)).forEach(file => { 
            console.log("A " + file.split(".")[0]);
      });
    });
}