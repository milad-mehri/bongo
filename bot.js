
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

			userSchema.find({ lottery: {enteredlottery : true}}, async function (err, docs) {
				if (err) {
					console.log(err);
				}
				else {


					var prize = Math.floor(Math.random() * 100000 + 50000);
					var random = Math.floor(Math.random() * docs.length);
					var winnerid = docs[random].userid
					var winner = await db.fetch(winnerid)

					var newbal = winner.bal + prize
					await db.set(winnerid, 'bal', newbal)

					try {

						(await client.users.fetch(winnerid)).send("You won the $" + prize + " lottery! Go here for more info https://discord.gg/yt6PMTZNQh !");
					} catch (error) {
						console.log(error)
					}


					var i;
					for (i = 0; i < docs.length; i++) {
						if (docs[i]['bal'] > 1000 && docs[i]['lottery']['autolottery'] === true) {


							docs[i].lottery.enteredlottery = true
						} else {
							docs[i].lottery.enteredlottery = false

						}
									await db.set(docs[i].userid, 'lottery', docs[i].lottery)

					}


					const embed = new Discord.MessageEmbed()
						// Set the title of the field
						.setTitle('Lottery results')
						// Set the color of the embed
						.setColor('6FA8DC')
						// Set the main content of the embed
						.setDescription(`<@${winnerid}> won the $${prize} lottery! There were a total of ${docs.length} people who bought a ticket.` + ' `Do a.lottery or a.autolottery to enter`');

					// Send the embed to the same channel as the message


					client.channels.cache.get('784908656550477905').send(embed).then(message => {
						message.crosspost()
							.then(() => console.log('Crossposted message'))
							.catch(console.error);

					}).catch();

				}
			});
		})





	}, 2 * 3600000)

})


client.on('ready', async () => {


	setInterval(async function () {
		console.log('cycle')

		var a = await userSchema.find({ businessObject: {name:'Fish Shop'} }, async function (err, docs) {
			if (docs) {
				docs.forEach(async user => {
					if (user.businessObject['stock'] < 1) {
						return;
					} else {
						user.businessObject.bal =user.businessObject.bal + 500 * user.businessObject.stock
						user.businessObject.stock = user.businessObject.stock-1


						await db.set(user.userid, 'businessObject', user.businessObject)
					}


				})
			}


		})
	}, 1200000)//1200000

})



client.on('guildMemberAdd', async member => {
	if ('808772193102069802' === member.guild.id) {
		console.log(member)
		var embed = new Discord.MessageEmbed().setAuthor('Welcome to the ZR Bot server').setDescription('To get started make sure to read the rules in <#809569043454361610> \nIf you would like to add the bot get started [here](https://discord.com/oauth2/authorize?client_id=819285176697356349&permissions=379968&scope=bot%20applications.commands)\n\nIf you\'re having trouble with the bot don\'t hesitate to ask in <#829893631888195604>  \nYou can do `zr help` to get started if you are new to the bot').setFooter('Bongo Bot | discord.gg/yt6PMTZNQh')

		member.send(embed)
	}
	//member.send('Welcome  Welcome to Big Bag of Potatoes\nHope you have a good time in our server. Please make sure to read the rules in <#807356813606518804>, and then head over to <#807356856704040990> for your own custom roles!')
})


client.snipes = new Map()
client.on('messageDelete', function (message, channel) {
	client.snipes.set(message.channel.id, {
		content: message.content,
		author: message.author,
		image: message.attachments.first() ? message.attachments.first().proxyURL : null
	})
});