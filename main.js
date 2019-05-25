// load up the required files and frameworks as neccessary
const fs = require('fs');
const config = require('./config.json');
const Discord = require('discord.js');
const bot = new Discord.Client();
global.currAns = '';
bot.commands = new Discord.Collection();
load();

// once connected echo into console that its successful then set the activity to something witty
bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag}`);
	bot.user.setActivity("I mean... Studying!"); 
	
	// this will set an loop that will run every 24hrs at 8am
	// triggering a function to check for birthdays on that day
	setTimeout(function(){
		// Author: Ben Moody
		birthdayMessage(); 
        var dayMillseconds = 1000 * 60 * 60 * 24;
        setInterval(function(){ birthdayMessage(); }, dayMillseconds);
    }, leftToEight());
});

// if Discord API throws an error, repeat this into the console.
bot.on('error', () => {
	console.error("Error");
});

bot.on('message', msg => {
	//check if message starts with "!" and isn't a message from itself
	//this is to trigger the commands
	if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

	// split the command into two portions: the command itself and then any following arguments that need to be dealt with
	const args = msg.content.slice(config.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	
	// if we want to load all the commands into the bot without restarting
	if (commandName == 'reload') {
		load(true);
		return msg.reply('Commands have been reloaded');
	}
	
	// this bit of code will search the commands directory for a matching command and run that code
	// if no command is found, do nothing. If a command is found but will not run, throw the error.
	const commandz = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!commandz) return;
	try {
		commandz.execute(msg, args, Discord);
	}
	catch (error) {
		console.error(error);
		msg.reply('there was an error trying to execute that command!');
	}
});

// this runs when someone joins the server so we can assign them a role.
bot.on('guildMemberAdd', guildMemberAdd => {
	guildMember.setRoles['554106122991304724'];
});

// should the bot disconnect from the Discord API. Attempt to automatically reconnect.
bot.on('disconnect', () => {
	console.log("Bot disconnected. Reconnecting...");
	bot.login(config.token);
});

// connect the bot to the Discord API then wait for the 'ready' from the end server
// the token is stored in the config file which is not stored on GitHub so it isn't stolen (again)
bot.login(config.token);

global.saveAnswer = function(answer) {
	currAns = answer.trim().toLowerCase();
}

global.retAnswer = function() {
	if (currAns == '') {
		return false;
	}
	else {
		return currAns;
	}
}

global.endAnswer = function () {
	currAns = '';
}

function load(reload) {
	// This function will load and reload (if true arg passed) commands from commands folder
	// allowing for new commands to be added without restarting script.
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
	if (reload) bot.commands.deleteAll();
	for (const file of commandFiles) {
		if (reload) delete require.cache[require.resolve(`./commands/${file}`)];
		const command = require(`./commands/${file}`);
		bot.commands.set(command.name, command);
	}
}

// tells us how long left until 8am the next day when it will check for birthdays again
function leftToEight(){
		var d = new Date();
		return (-d + d.setHours(8,0,0,0));
}

// check if the date lines up with any birthdays and send a message if true
function birthdayMessage() {
	const today = new Date();
	const todayDate = today.getDate();
	const todayMonth = today.getMonth() + 1;
	const bdString = todayDate + "-" + todayMonth;
	// find the general chat channel ID and send the messages to it
	const bdChannel = bot.channels.find('name', 'general');
	
	console.log(bdString);
	if (bdString == "4-1") {
		bdChannel.send("Happy Birthday to Benjamin");
	}
	else if (bdString == "7-5") {
		bdChannel.send("Happy Birthday to Trent");
	}
	else if (bdString == "14-3") {
		bdChannel.send("Happy Birthday to Mohannad");
	}
	else if (bdString == "10-12") {
		bdChannel.send("Happy Birthday to Andrew");
	}	
	else if (bdString == "30-8") {
		bdChannel.send("Happy Birthday to Will");
	}
	else if (bdString == "10-10") {
		bdChannel.send("Happy Birthday to Brendon");
	}
}