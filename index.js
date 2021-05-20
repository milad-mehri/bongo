const { ShardingManager } = require('discord.js');
const token = process.env.token
const manager = new ShardingManager('./bot.js', { token: token });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();
