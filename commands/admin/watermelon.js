const Discord = require('discord.js');


module.exports = {
	name: 'watermelon',
	description: 'secret command',
	usage: '`a.watermelon`',

	execute(message) {

		message.channel.send(':watermelon:')



	},
};
