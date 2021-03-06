
const Discord = require('discord.js');
const db = require("../../db")
const embeds = require("../../functions/embeds")

module.exports = {
    name: 'disable',
    description: 'Disable commands!',
    usage: '`a.disable <command>`',
    category: 'utility',

    async execute(message, args) {

        if (!args[0]) return embeds.errorEmbed(message, "Invalid arguments.")


        var command = message.client.commands.get(args[0].toLowerCase()) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0].toLowerCase()));
        if (!command) return message.channel.send("This is not a valid command.")

        if (["disable", "enable"].includes(command.name)) return embeds.errorEmbed(message, "This command cannot be disabled!")


        if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.reply('You cannot use the **disable** command.');
        }

        var result = await db.fetchguild(message.guild.id)
        if (result.disabled[command.name]) return message.channel.send("This command is already disabled.")


        result.disabled[command.name] = true
        await db.guildset(message.guild.id, "disabled", result.disabled)

        console.log(result.disabled)
        return embeds.successEmbed(message, `${command["name"]} was disabled!`)



    },
};