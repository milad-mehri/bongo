const Discord = require('discord.js');
const canvacord = require("canvacord")



module.exports = {
	name: 'quote',
	usage: '`a.quote (mention) (text)`',
	category: 'image',

	async execute(message, args) {

		var member = message.mentions.users.first() || message.author
		let avatar = member.displayAvatarURL({ dynamic: false, format: 'png' });
		if(message.mentions.users.first()) args.shift()
		let image = await canvacord.Canvas.quote({image: avatar, message : args.join` `, username: member.username });
		let attachment = new Discord.MessageAttachment(image, "quoted.png");
		return message.channel.send(attachment);
	},
};














