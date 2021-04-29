const Discord = require('discord.js');
const { responses } = require('../../helpers/8ball.json')
const {blankEmbed} = require('../../functions/embeds')



module.exports = {
	name: '8ball',
	description: 'Get the answer to your question!',
	aliases: ['eightball', '8'],
	usage: '`a.8ball <question>`',
	category: 'fun',

	execute(message, args) {

		if (!args[0]) return message.reply('You have to ask a question.')
		var response = responses[Math.floor(Math.random() * responses.length)];
		blankEmbed(message, response)
	},
};