const Discord = require('discord.js');

const got = require('got');



module.exports = {
	name: 'meme',
	description: 'Get a meme from r/dankmemes',
	usage: '`a.meme`',
	category: 'fun',
	cooldown: 3,

	async execute(message) {

		function re(a, b) {//embed function
			const embed = new Discord.MessageEmbed()
				// Set the title of the field
				.setTitle(a)
				// Set the color of the embed
				.setColor('6FA8DC')
				// Set the main content of the embed
				.setDescription(b);

			// Send the embed to the same channel as the message
			message.channel.send(embed);
		}


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
					message.channel.send("Reddit machine goes brrr. Sorry, could not fetch posts from this subreddit :(");
				}
			})
		
	},

};













