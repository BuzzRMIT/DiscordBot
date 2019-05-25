module.exports = {
    name: 'answer',
	aliases: ['ans'],
    description: 'Random Trivia Answer',
	author: 'Ben Moody',
    execute(message, args, Discord) {
		if (!args.length) {
			return message.reply("Please provide an answer");
		}
		if (!retAnswer()) {
			return message.reply("Must use !trivia first.");
		}
		var realAns = retAnswer();
		var userAns = args.toString();
		if (realAns.indexOf(userAns) > -1) {
			endAnswer();
			return message.reply("Correct!");
		}
		else {
			return message.reply("Incorrect... :(");
		}
    },
};