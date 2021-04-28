const Discord = require('discord.js');

module.exports = {
		name: 'ss',
	description: 'Admin command',
	aliases: ['setstatus'],

	execute(message,args) {

if(message.author.id !== '248692731163967498'){
			return;
		}
		message.client.user.setActivity(args.join` `, {
        type: 'WATCHING',
    })	
	},
};	