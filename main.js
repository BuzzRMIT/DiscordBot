
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	// random number generator
	if (message.content.startsWith("!rng")) {
		max = message.content.split(" ")[1];
		message.channel.send(rng(max));
	} 

	// rock = 0, paper = 1, scissors = 2
	else if(message.content.startsWith("!rps")) {
		playerChoice = message.content.split(" ")[1].toLowerCase();

		message.channel.send(rpsBotChoice());

		choiceNum = sprChoiceToNum(choice);
		sprResult(choiceNum, botChoice);
	}
});

// returns an integer between 1 and max
function rng(max) {
	return Math.floor((Math.random() * max) + 1);
}

// generates the bot's choice
function rpsBotChoice() {
	botChoice = Math.floor((Math.random() * 3));
	if(botChoice == 0) {
		return "Rock";
	} else if(botChoice == 1){
		return "Paper";
	} else {
		return "Scissors";
	}
}

// converts the users choice to a number 0-2
function rpsChoiceToNum(choice) {
	if(choice === "rock") {
		return 0;
	} else if(choice === "paper") {
		return 1;
	} else {
		return 2;
	}
}

// calculates the result of the game
// i = player choice, j = bot choice
function rpsResult(i, j) {
	result = (i + -j) % 3;
	if(result == 0) {
		// draw
		message.channel.send("Draw!");
	} else if(result == 1) {
		// person wins
		message.channel.send("Congratulations! You win.");
	} else {
		// bot wins
		message.channel.send("Victory!");
	}
}

client.login('NTU1Njc1MjQ1MjY5NDgzNTUx.D2up4w.vV80cbCWPP9KWoBL-G0Ns1tGTp0');
