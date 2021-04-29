const {
    MessageEmbed
} = require('discord.js');
const emojis = require('../design/emojis.json');
const colors = require('../design/colors.json');
const {responses, cooldownResponses} = require('../helpers/cooldownResponses.json')


function convertMiliseconds(miliseconds, format) {
    var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

    total_seconds = parseInt(Math.floor(miliseconds / 1000));
    total_minutes = parseInt(Math.floor(total_seconds / 60));
    total_hours = parseInt(Math.floor(total_minutes / 60));
    days = parseInt(Math.floor(total_hours / 24));

    seconds = parseInt(total_seconds % 60);
    minutes = parseInt(total_minutes % 60);
    hours = parseInt(total_hours % 24);

    switch (format) {
        case 's':
            return total_seconds;
        case 'm':
            return total_minutes;
        case 'h':
            return total_hours;
        case 'd':
            return days;
        default:
            return { d: days, h: hours, m: minutes, s: seconds };
    }
};

function defaultEmbed(message, title, description, color, footer) {
    var embedColor;
    (colors[color]) ? embedColor = colors[color] : embedColor = colors.blue

    var defembed = new MessageEmbed()
        .setTitle(title)
        .setDescription(description)
        .setColor(embedColor)
    if (footer) defembed.setFooter(footer)
    return message.reply(defembed).catch(() => null);
}

function successEmbed(message, description) {
    return message.reply(
        new MessageEmbed()
            .setDescription(emojis.success + '   **Success!** ' + description)
            .setColor(colors.green)
    ).catch(() => null)
}

function errorEmbed(message, description) {
    return message.reply(
        new MessageEmbed()
            .setDescription(emojis.error + '   **Error!** ' + description)
            .setColor(colors.red)
    ).catch(() => null)
}

function cooldownEmbed(message, description) {
    var result = convertMiliseconds(parseInt(description))

    var time = ''
    if (result.d > 0) time += `${result.d} days, `
    if (result.h > 0) time += `${result.h} hours, `
    if (result.m > 0) time += `${result.m} minutes and `
    time += `${result.s} seconds`
   return message.reply(
        new MessageEmbed()
            .setDescription(emojis.loading + `   **${responses[Math.floor(Math.random() * responses.length)]}**  ${cooldownResponses[Math.floor(Math.random() * cooldownResponses.length)].replace("${time}", time)}`)
            .setColor(colors.yellow)
    ).catch(() => null)
}

function blankEmbed(message, description) {
    return message.reply(
        new MessageEmbed()
            .setDescription(description)

    ).catch(() => null)
}

module.exports = {
    defaultEmbed,
    successEmbed,
    errorEmbed,
    cooldownEmbed,
    blankEmbed
}