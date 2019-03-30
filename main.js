
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content === '!ping') {
		message.channel.send('Pong.');
	}
});

client.login('NTU1Njc1MjQ1MjY5NDgzNTUx.D2up4w.vV80cbCWPP9KWoBL-G0Ns1tGTp0');
