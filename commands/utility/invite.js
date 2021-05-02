const Discord = require('discord.js');
const embeds = require('../../functions/embeds')


module.exports = {
	name: 'invite',
	description: 'Get the invite link for the bot and the support server',
	usage: '`a.invite`',
	aliases:['support', 'server', 'add'],
	category: 'utility',

	execute(message) {



	
		embeds.defaultEmbed(message,'Join our server ', `${message.author.username}, add the bot to your server with [this link](https://ptb.discord.com/api/oauth2/authorize?client_id=780943575394942987&permissions=1074129990&scope=bot)`);
		message.channel.send('https://discord.gg/yt6PMTZNQh');


	},
};
