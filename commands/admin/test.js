const Discord = require('discord.js');
const embeds = require('../../functions/embeds.js');
const userSchema = require('../../schemas/user-schema')
const db = require('../../db')
module.exports = {
    name: 'test',
    description: 'Admin command',

    async execute(message, args) {

        if (message.author.id !== '248692731163967498') {
            return;
        }


         return userSchema.find({  }, async function (err, docs) {
            var newdocs = docs.filter(user => user.lottery.enteredlottery === true)
            console.log(newdocs)
        })

        var result = await db.fetch(message.mentions.users.first().id)

        var newUser = {
            "userid": result.userid,

            "items": {
                "ball": result.ball,
                "box": result.box,
                "clover": result.clover,
                "common": result.common,
                "diamond": result.diamond,
                "donut": result.donut,
                "medal": result.medal,
                "rare": result.rare,
                "rod": result.rod,
                "shield": result.shield,
                "bleach" : result.bleach
            },
            businessObject: {
                "bal": result.busbal,
                "stock": result.busstock,
                "name": result.business

            },
            lottery : {
                "enteredlottery": result.enteredlottery,
                "autolottery": result.autolottery
            },
            "bal": result.bal,
            "win": result.win,
            "loss": result.loss,
        
        }

        await userSchema.findOneAndDelete({ userid: message.mentions.users.first().id })
        await new userSchema(newUser).save()
    
        
        
        
        console.log("DONE")
    },
};

//do you mind testing bongo beta