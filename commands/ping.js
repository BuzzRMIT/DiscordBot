module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(message, args, Discord) {
        message.reply('Pong!');
    },
};