const Discord = require('discord.js');
const canvacord = require("canvacord")



module.exports = {
	name: 'bed',
	usage: '`a.bed (mention)`',
	category: 'image',

	async execute(message) {
		var member = message.mentions.users.first()
		if(!member) return message.reply('you have to mention someone for this!')
		let avatarb = message.author.displayAvatarURL({ dynamic: false, format: 'png' });

		let avatar = member.displayAvatarURL({ dynamic: false, format: 'png' });
		let image = await canvacord.Canvas.bed(avatar, avatarb);
		let attachment = new Discord.MessageAttachment(image, "beded.png");
		return message.channel.send(attachment);
	},
};














