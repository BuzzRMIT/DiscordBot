module.exports = {
    name: 'rng',
	aliases: ['randomnumber', 'randnum'],
    description: 'Random Number Generator',
	author: 'Will Metcher',
    execute(message, args, Discord) {
		const MAX = (!args.length || isNaN(args)) ? 1000 : args[0];
		message.channel.send(Math.floor((Math.random() * MAX) + 1));
    },
};