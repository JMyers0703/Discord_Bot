const request = require('request');
var recipeQuery = "",
    calorieCount = "";

async function find(config, client, message, args) {
   let searchMessage = await message.reply({embed: {
            color: 3447003,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            title: "Searching for your recipe..."
          }
        });
    
    if(message.content.indexOf("calories:") > -1){
       recipeQuery = message.content.substring(8, message.content.length).split("calories:")[0];
       calorieCount = message.content.split("calories:")[1];
    }else{
       recipeQuery = message.content.substring(8, message.content.length);
       calorieCount = "9999";
    }
    var requestUrl;
    if(Math.round(Math.random()) == 1){
       requestUrl = `https://api.edamam.com/search?q=${recipeQuery}&app_id=${process.env.RECIPE_ID_1}&app_key=${process.env.RECIPE_KEY_1}&from=0&to=25&calories=0-${calorieCount}`; 
    }else{
       requestUrl = `https://api.edamam.com/search?q=${recipeQuery}&app_id=${process.env.RECIPE_ID_2}&app_key=${process.env.RECIPE_KEY_2}&from=0&to=25&calories=0-${calorieCount}`;
    }
    
    var jsonObject;
    
    request(requestUrl, function (error, response, body) {
        if (error && !response.statusCode == 200) return;
            jsonObject = JSON.parse(body);
            
            var ingredientList = "";
            var healthLabels = "";
            var cautionLabels = "";
            var num = Math.floor(Math.random() * Math.floor(jsonObject.hits.length));
            
            if(num != 0){
                
                jsonObject.hits[num].recipe.ingredientLines.forEach(function(ingredient) {
                    ingredientList += ingredient + "\n";
                });

                jsonObject.hits[num].recipe.healthLabels.forEach(function(health) {
                    healthLabels += health + "\n";
                });

                jsonObject.hits[num].recipe.cautions.forEach(function(caution) {
                    cautionLabels += caution + "\n";
                });

                if (ingredientList == "") {
                    ingredientList = "N/A";
                }
                if (healthLabels == "") {
                    healthLabels = "None";
                }
                if (cautionLabels == "") {
                    cautionLabels = "None";
                }
            
                searchMessage.edit({"embed": {
                        "title": jsonObject.hits[num].recipe.label,
                        "url": jsonObject.hits[num].recipe.url,
                        "color": 12118406,
                        "footer": {
                          "text": "found via api.edamam.com"
                        },
                        "image": {
                          "url": jsonObject.hits[num].recipe.image
                        },
                        "fields": [
                          {
                            "name": "Servings",
                            "value": String(Math.round(jsonObject.hits[num].recipe.yield)),
                            "inline": true
                          },
                          {
                            "name": "Calories per serving",
                            "value": String(Math.round((jsonObject.hits[num].recipe.calories / jsonObject.hits[num].recipe.yield))),
                            "inline": true
                          },
                          {
                            "name": "Ingredients",
                            "value": ingredientList
                          },
                          {
                            "name": "Health Labels",
                            "value": healthLabels,
                            "inline": true
                          },
                          {
                            "name": "Health Cautions",
                            "value": cautionLabels,
                            "inline": true
                          },
                          {
                            "name": "View the recipe",
                            "value": `[${jsonObject.hits[num].recipe.label}](${jsonObject.hits[num].recipe.url})`
                          }
                        ]
                      }
                });
            } else {
                searchMessage.edit({"embed": {
                        "title": "No recipe found",
                        "description": "Please try again!",
                        "color": 12118406
                      }
                });
            }
    });
}

module.exports = { find };