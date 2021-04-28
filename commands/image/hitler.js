const Discord = require('discord.js');
const canvacord = require("canvacord")



module.exports = {
	name: 'hitler',
	usage: '`a.hitler (mention)`',
	category: 'image',

	async execute(message) {
		var member = message.mentions.users.first() || message.author
		let avatar = member.displayAvatarURL({ dynamic: false, format: 'png' });
		let image = await canvacord.Canvas.hitler(avatar);
		let attachment = new Discord.MessageAttachment(image, "hitlered.png");
		return message.channel.send(attachment);
	},
};














