const db = require('../../db.js');
const Discord = require('discord.js');
const users = require('../../schemas/user-schema')

module.exports = {
	name: 'rich',
	description: 'View the richest users in your server!',
	aliases: ['r', 'lb', 'leaderboard'],
	usage: '`a.rich`',
	category: 'economy',


	async execute(message, client) {

		var userbal = await db.fetch(message.author.id) 
		await message.guild.members.fetch()
		function comma(number) {
			var i = number.toString();
			i = i.split("").reverse();
			i.forEach((item, index) => {
				if (index % 3 == 0) i[index] = i[index] + ",";
			});
			i[0] = i[0][0];
			return i.reverse().join("");
		}
		var allUsers = users.find({}).sort({ "bal": -1 }).exec(function(err, docs) {
			var newlist = docs.filter(a => message.guild.member(a.userid) && a.userid !== '780943575394942987' && a.bal > 1)
			newlist = newlist.filter(a => !message.guild.member(a.userid).user.bot && a.bal > 1000)

			var abbbb = newlist.findIndex(function(wizard) {
				return wizard.userid === message.author.id;
			});
console.log(abbbb)

			var lblength = 10
			if (newlist.length < 10) lblength = newlist.length

			var vw;
			var names = []
			var bals = []
			for (let i = 0; i < lblength; i++) {
				//let test = await message.client.users.fetch(a.userid)
				if (i === 0) {
					vw = ':first_place:'
				} else if (i === 1) {
					vw = ':second_place:'
				} else if (i === 2) {
					vw = ':third_place:'
				} else if (i === 3) {
					vw = ':small_orange_diamond:'
				} else if (i === 4) {
					vw = ':small_orange_diamond:'
				} else {
					vw = ':small_blue_diamond:'
				}
				names.push(vw + ' **' + comma(newlist[i].bal) + '** - ' + message.guild.member(newlist[i].userid).user.tag)
			//	bals.push('$' + comma(newlist[i].bal))

			}


				names.push('\n' + (abbbb+1)+'. **' +   comma(userbal.bal) + '** - **YOU** ('+ message.author.tag + ')')
				bals.push('\n**$' + comma(userbal.bal) + '**')

			message.channel.send({
				content: '',
				embed: {

					author: {
						name: 'Richest users in ' + message.guild.name,
					},
					/*	description: names.join`\n`,*/
					footer: {
						text: 'discord.gg/yt6PMTZNQh'
					},
					fields: [
						{
							value: names,
							inline: true,
						},
				
					]
				}
			})

		})

		//return message.reply('try doing `a.globalrich`')


	},
};
















