
const { token, prefix } = require('./config/config.json')
const Topgg = require('@top-gg/sdk');
const webhook = new Topgg.Webhook('test');

const db = require('./db.js');
const fs = require('fs');
const canvacord = require("canvacord")

const embeds = require("./functions/embeds")
const Discord = require('discord.js');
const client = new Discord.Client

const express = require('express');
const app = express();


app.get("/", (req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write('<html><body><p>This is home Page.</p></body></html>');
	res.end();
})
app.post("/votes/top.gg", webhook.middleware(), async (req, res) => {
	res.status(200).end()
	const vote = req.vote;
	client.channels.cache.get('828098780968648734').send(vote.user)
	let result = await db.fetch(vote.user);

	let boxs = result.items.box

	if (vote.guild === '781393539451977769') {
		result.items.box = parseInt(boxs) + 1
		db.set(vote.user, 'items', result.items);
	} else {
		if (vote.isWeekend) {
			var newbox = parseInt(boxs) + 2
		} else {
			var newbox = parseInt(boxs) + 1

		}
		result.items.box = parseInt(newbox)
		db.set(vote.user, 'items', result.items);



	}


})


app.listen(process.env.PORT || 5000);



client.on('ready', () => {

	const promises = [
		client.shard.fetchClientValues('guilds.cache.size'),
		client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'),
	];

	return Promise.all(promises)
		.then(results => {
			const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
			const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
			client.user.setActivity(`a.help | ${totalMembers} members and ${totalGuilds} servers`, {
				type: 'WATCHING',
			})
			return console.log('fetched member count')
		})
		.catch(console.error);

})

client.login(token)

client.commands = new Discord.Collection();


fs.readdirSync('./commands/').forEach(dir => {
	const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
	for (let file of commands) {
		let pull = require(`./commands/${dir}/${file}`);
		if (pull.name) {
			client.commands.set(pull.name, pull);
		} else {
			continue;
		}
	}
});


client.items = new Discord.Collection();

const items = fs.readdirSync(`./items/`).filter(file => file.endsWith('.js'));
for (let file of items) {
	let pull = require(`./items/${file}`);

	client.items.set(pull.name, pull);

}



// STARTING CMD HANDLING
client.on('message', async message => {
	if (message.webhookID) return;

	if (message.content.replace(/ /gi, '').replace(/!/gi, '') === '<@780943575394942987>') return embeds.defaultEmbed(message, ':wave: Hi, Im bongo!', 'My prefix is `a.`!. Type `a.help` to get started!')


	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(' ');
	var command = args.shift().toLowerCase();



	var b = message.content.toLowerCase();

	if (!b.startsWith(prefix) || message.author.bot || (message.guild === null && command !== 'help')) return;



	var commandToExecute = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

	if (!commandToExecute) return;

	try {
		if (message.guild) {
			var result = await db.fetch(message.author.id)
			if(result.banned) return;
			var guildResults = await db.fetchguild(message.guild.id)
			if (guildResults.disabled[commandToExecute.name]) return embeds.errorEmbed(message, "This command is disabled in this server.")
		}
		//cooldowns
		if (commandToExecute.cooldown) {

			if ((commandToExecute.cooldown * 1000) - (Date.now() - result.cooldowns[commandToExecute.name]) > 1) {
				return embeds.cooldownEmbed(message, (commandToExecute.cooldown * 1000) - (Date.now() - result.cooldowns[commandToExecute.name]));
			} else {
				result.cooldowns[commandToExecute.name] = Date.now()
				await db.set(message.author.id, 'cooldowns', result.cooldowns)
			}
		}
		//snipes
		var snipes = client.snipes


		commandToExecute.execute(message, args, snipes, client);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!\nPlease contact milad#9999');

	}

});

const mongoose = require('mongoose')
const userSchema = require('./schemas/user-schema')
const mongo = require('./mongo')

client.on('ready', async () => {
	setInterval(async function () {

		await mongo().then(async mongoose => {

			userSchema.find({}, async function (err, docs) {
				if (err) {
					console.log(err);
				}
				else {

					var allUsersWhoEntered = docs.filter(user => user.lottery.enteredlottery === true)

					var winnerId = allUsersWhoEntered[Math.floor(Math.random() * allUsersWhoEntered.length)].userid
					var winner = await db.fetch(winnerId)

					var prize = Math.floor(Math.random() * 100000 + 50000);

					await db.set(winnerId, 'bal', winner.bal + prize)

					try {

						(await client.users.fetch(winnerId)).send("You won the $" + prize + " lottery! Go here for more info https://discord.gg/yt6PMTZNQh !");
					} catch (error) {
						console.log(error)
					}

					allUsersWhoEntered.forEach(async user => {
						if (user['bal'] > 1000 && user['lottery']['autolottery'] === true) {

							await db.set(user.userid, 'bal', user.bal - 1000)
							user.lottery.enteredlottery = true
						} else {
							user.lottery.enteredlottery = false

						}
						await db.set(user.userid, 'lottery', user.lottery)

					})

					const embed = new Discord.MessageEmbed()
						.setTitle('Lottery results')
						.setColor('6FA8DC')
						.setDescription(`<@${winnerId}> won the $${prize} lottery! There were a total of ${docs.length} people who bought a ticket.` + ' `Do a.lottery or a.autolottery to enter`');



					client.channels.cache.get('784908656550477905').send(embed).then(message => {
						message.crosspost()
							.then(() => console.log('Crossposted message'))
							.catch(console.error);

					}).catch();

				}
			});
		})





	}, 3600000 * 2)

})


client.on('ready', async () => {


	setInterval(async function () {
		console.log('cycle')

		await userSchema.find({}, async function (err, docs) {

			var businessUsers = docs.filter(user => ['Fish Shop', "Rare Fish Shop"].includes(user.businessObject.name))
			if (businessUsers) {
				businessUsers.forEach(async user => {
					if (user.businessObject['stock'] < 1) {
						return;
					} else {
						if (user.businessObject.name === "Rare Fish Shop") {
							user.businessObject.bal = user.businessObject.bal + 500 * user.businessObject.stock
						}
						user.businessObject.bal = user.businessObject.bal + 500 * user.businessObject.stock
						user.businessObject.stock = user.businessObject.stock - 1


						await db.set(user.userid, 'businessObject', user.businessObject)
					}


				})
			}


		})
	}, 1200000)//1200000

})



client.on('guildMemberAdd', async member => {
	if ('808772193102069802' === member.guild.id) {

		var embed = new Discord.MessageEmbed().setAuthor('Welcome to the ZR Bot server').setDescription('To get started make sure to read the rules in <#809569043454361610> \nIf you would like to add the bot get started [here](https://discord.com/oauth2/authorize?client_id=819285176697356349&permissions=379968&scope=bot%20applications.commands)\n\nIf you\'re having trouble with the bot don\'t hesitate to ask in <#829893631888195604>  \nYou can do `zr help` to get started if you are new to the bot').setFooter('Bongo Bot | discord.gg/yt6PMTZNQh')

		member.send(embed)
	}
})


client.snipes = new Map()
client.on('messageDelete', function (message, channel) {
	client.snipes.set(message.channel.id, {
		content: message.content,
		author: message.author,
		image: message.attachments.first() ? message.attachments.first().proxyURL : null
	})
});