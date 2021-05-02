
const Discord = require('discord.js');
module.exports = {
	name: 'purge',
	description: 'Purge 1-99 messages from the chat',
	usage: '`a.purge <amount>`',
	aliases: ['prune', 'clean', 'del'],
  category: 'utility',

	async execute(message, args) {

		if(['max', 'all'].includes(args[0].toLowerCase())) args[0] = 99
		const amount = parseInt(args[0]);

		if (!message.member.hasPermission('MANAGE_MESSAGES')) {
			return message.reply('You cannot use the **prune** command.');
		}

		if (isNaN(amount)) {
			return message.channel.send("that doesn't seem to be a valid number.");
		} else if (amount < 1 || amount > 99) {
			return message.channel.send(
				'You need to input a number between **1** and **99**.'
			);
		}
		message.channel.bulkDelete(amount + 1);

		const sentMessage = await message.channel.send(
			`Deleted **${amount}** messages`
		);
		sentMessage.delete({ timeout: 3000 });




	},
};














