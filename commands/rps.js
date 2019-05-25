module.exports = {
    name: 'rps',
	aliases: ['rockpaperscissors'],
    description: 'Rock Paper Scissors',
	author: 'Will Metcher',
    execute(message, args, Discord) {
		argsRegEx = RegExp('rock|paper|scissors','g');
		if (!args.length || !argsRegEx.test(args[0])) {
			return message.reply("Incorrect command usage. Try: !rps rock");
		}
		
		PlayerCHOICE = args[0];
		if (PlayerCHOICE == "rock") { PlayerNUM = 0; }
		else if (PlayerCHOICE == "paper") { PlayerNUM = 1; }
		else { PlayerNUM = 2; }
		
		BotCHOICE = Math.floor((Math.random() * 3));
		if (BotCHOICE == 0) { message.reply("Rock!"); }
		else if (BotCHOICE == 1) { message.reply("Paper!"); }
		else { message.reply("Scissors!"); }
		
		result = (PlayerNUM + -BotCHOICE) % 3;
		if (result == 0) {
			return message.reply("It's a draw!");
		}
		else if (result == 1 || result == -2) {
			return message.reply("You win!");
		}
		else {
			return message.reply("I beat you!");
		}
    },
};