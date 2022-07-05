const Discord = require('discord.js'),
      config  = require('./config.json');

config.cfg.intents = new Discord.Intents(config.cfg.intents);

const reaction = require('./reaction.json')
    
const bot = new Discord.Client(config.cfg);
bot.login(config.token);

const badWord = reaction.badWord
const reactionBadWords = reaction.reactionBadWords

bot.on('ready', function(client) {
	console.log('Ready')
})

bot.on('messageCreate', (message) => {
	if(badWord.includes(message.content)) {
		reactionBad(message)
	}
	if(message.content.toLowerCase() == 'чмоня что нового?') {
		message.reply(reaction.updateMessage)
	}
})

function reactionBad(message) {
	let randomizeNumber = Math.floor(Math.random() * reactionBadWords.length)
	const messageBody = message.content.split(' ')

	messageBody.forEach(el => {
		if(badWord.includes(el.toLowerCase())) {
			message.reply(reactionBadWords[randomizeNumber])
		}
	})

	console.log('Сообщение от ' + message.author.username)
}