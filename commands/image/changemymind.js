const Discord = require('discord.js');
const canvacord = require("canvacord")



module.exports = {
	name: 'changemymind',
	usage: '`a.changemymind (mention)`',
	category: 'image',
	aliases: ['cmm'],

	async execute(message, args) {

		if(!args[0]) return message.reply('you need to write something')
		var text = args.join(' ')
		let image = await canvacord.Canvas.changemymind(text);
		let attachment = new Discord.MessageAttachment(image, "changemymind.png");
		return message.channel.send(attachment);
	},
};
