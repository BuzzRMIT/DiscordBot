const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://trivia.fyi/random-trivia-questions/';
module.exports = {
    name: 'trivia',
	aliases: ['quiz'],
    description: 'Random Trivia',
	author: 'Ben Moody',
    execute(message, args, Discord) {
		rp(url).then(function(html){
			//success!
			//console.log($('.query-title > a', html).length);
			message.channel.send($('.query-title > a', html).text().trim());	
			const ans = $('div > .su-clearfix', html).text();
			saveAnswer(ans);
		}).catch(function(err){
			//handle error
			console.log("error retrieving trvia");
		});
    },
};