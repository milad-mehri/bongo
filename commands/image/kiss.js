const Discord = require('discord.js');
const canvacord = require("canvacord")



module.exports = {
	name: 'kiss',
	usage: '`a.kiss (mention)`',
	category: 'image',

	async execute(message) {
		if(!message.channel.nsfw) return message.channel.send('this command is only for nsfw channels :smirk:')
		var member = message.mentions.users.first()
		if(!member) return message.reply('you have to mention someone for this!')
		let avatarb = message.author.displayAvatarURL({ dynamic: false, format: 'png' });

		let avatar = member.displayAvatarURL({ dynamic: false, format: 'png' });
		let image = await canvacord.Canvas.kiss(avatar, avatarb);
		let attachment = new Discord.MessageAttachment(image, "kissed.png");
		return message.channel.send(attachment);
	},
};














