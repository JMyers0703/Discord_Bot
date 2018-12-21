exports.run = (config, client, message, args) => {
    message.channel.send(client.ping).catch(console.error);
}