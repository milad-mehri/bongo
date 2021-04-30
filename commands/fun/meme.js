const Discord = require('discord.js');

const got = require('got');



module.exports = {
	name: 'meme',
	description: 'Get a meme from r/dankmemes',
	usage: '`a.meme`',
	category: 'fun',
	cooldown: 3,

	async execute(message) {

		var url = `https://www.reddit.com/r/dankmemes/random/.json`;

		got(url).then(response => {
			try {
				const content = JSON.parse(response.body);
				const postType = content[0].data.children[0].data.post_hint;
				const permalink = content[0].data.children[0].data.permalink;
				const postUrl = `https://reddit.com${permalink}`;
				const postImage = content[0].data.children[0].data.url;
				const postTitle = content[0].data.children[0].data.title;
				const postUpvotes = content[0].data.children[0].data.ups;
				const postNumComments = content[0].data.children[0].data.num_comments;
				if (postType == "rich:video") {
					const videoUrl = content[0].data.children[0].data.url_overridden_by_dest;
					message.channel.send(videoUrl);
				} else {
					const embed = new Discord.MessageEmbed();
					embed.setImage(postImage);
					embed.setFooter(`👍 ${postUpvotes} 💬${postNumComments}`);
					message.channel.send(embed);
				}
			} catch (err) {
				message.channel.send("Reddit machine goes brrr. Sorry, could not fetch memes :(");
			}
		})

	},

};













