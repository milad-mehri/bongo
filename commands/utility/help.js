const Discord = require('discord.js');
const embeds = require('../../functions/embeds')



module.exports = {
	name: 'help',
	description: 'Get some help',
	aliases: ['h', 'commands', 'cmds'],
	usage: '`a.help <catergory>`, `a.help <command>`',
	category: 'economy',

	execute(message, args) {

		if (args[0] === 'util' || args[0] === 'utility' || args[0] === '4') {
			var commands = message.client.commands.filter(cmd => cmd.category === 'utility')
			var commandNames = []
			commands.forEach(a => commandNames.push('`' + a.name + '`'))

			embeds.defaultEmbed( message,'Utility Commands', commandNames.join`, `)
		}  else if (args[0] === 'games' || args[0] === 'fun' || args[0] === '2') {
			var commands = message.client.commands.filter(cmd => cmd.category === 'fun')
			var commandNames = []
			commands.forEach(a => commandNames.push('`' + a.name + '`'))
			embeds.defaultEmbed( message,'Fun Commands', commandNames.join`, `)

		} else if (args[0] === 'currency' || args[0] === 'economy' || args[0] === '1') {
			var commands = message.client.commands.filter(cmd => cmd.category === 'economy')
			var commandNames = []
			commands.forEach(a => commandNames.push('`' + a.name + '`'))
			embeds.defaultEmbed( message,'Economy Commands', commandNames.join`, `)

		} else if (args[0] === 'image' || args[0] === '3') {
			var commands = message.client.commands.filter(cmd => cmd.category === 'image')
			var commandNames = []
			commands.forEach(a => commandNames.push('`' + a.name + '`'))
			embeds.defaultEmbed( message,'Image Commands', commandNames.join`, `)

		} else {

			var command = message.client.commands.get(args[0]) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
			if (args[0] && command) {
				var description = command.description || 'none'
				var aliases = command.aliases || ['none']
				var usage = command.usage || 'no example here'
				const info = new Discord.MessageEmbed()
					.setColor('0075ff')
					.setTitle(command.name + ' command info')
					.addFields(
						{ name: 'Description', value: description },
						{ name: 'Aliases', value: aliases.join`, ` },
						{ name: 'Usage', value: usage },
					)

					.setFooter('Join the support server for more help (a.invite)');
				message.channel.send(info)
			} else {
				embeds.defaultEmbed( message,'Bongo Help!', `Bongo is an economy and moderation bot. It has a library of fun commands and offers complete functionality with utility and moderation!

**Do a.help <number> to get more information on the module.**
`+ '\n:one:: `Economy`\n:two:: `Games`\n:three:: `Image`\n:four:: `Utility`\n\nCheck our the [docs](https://memm-milad.gitbook.io/bongo/) and join our [support server](https://discord.com/invite/yt6PMTZNQh)!')

			}
		}







	},
};


