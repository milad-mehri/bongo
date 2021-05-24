const { ShardingManager } = require('discord.js');
const token = process.env.token
const manager = new ShardingManager('./bot.js', { token: token });
const Statcord = require("statcord.js");
const statcord = new Statcord.ShardingClient({
    key: process.env.statcord,
    manager,
    postCpuStatistics: true, /* Whether to post CPU statistics or not, defaults to true */
    postMemStatistics: true, /* Whether to post memory statistics or not, defaults to true */
    postNetworkStatistics: true, /* Whether to post memory statistics or not, defaults to true */
    autopost: true /* Whether to auto post or not, defaults to true */
});
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();

statcord.on("autopost-start", () => {
    // Emitted when statcord autopost starts
    console.log("Started autopost");
});


statcord.on("post", status => {
    // status = false if the post was successful
    // status = "Error message" or status = Error if there was an error
    if (!status) console.log("Successful post");
    else console.error(status);
});