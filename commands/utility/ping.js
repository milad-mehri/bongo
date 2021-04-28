
const Discord = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'Get the bots ping',
	usage: '`a.ping`',
  category: 'utility',

	async execute(message, args) {
		message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(message.client.ws.ping)}ms`);



	},
};














