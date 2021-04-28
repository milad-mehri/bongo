const Discord = require('discord.js');
const canvacord = require("canvacord")



module.exports = {
	name: 'clyde',
	usage: '`a.clyde (mention)`',
	category: 'image',

	async execute(message, args) {

		if(!args[0]) return message.reply('you need to write something')
		var text = args.join(' ')
		let image = await canvacord.Canvas.clyde(text);
		let attachment = new Discord.MessageAttachment(image, "clyde.png");
		return message.channel.send(attachment);
	},
};
