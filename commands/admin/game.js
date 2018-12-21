exports.run = (config, client, message, args) => {
    client.user.setPresence({
        game: {
            name: message.content.substring(6, message.content.length).split("type:")[0],
            type: message.content.substring(6, message.content.length).split("type:")[1]
        }
    });
}