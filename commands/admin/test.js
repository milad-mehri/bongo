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




        var result = await db.fetch(message.author.id)

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
            "bal": result.bal,
            "win": result.win,
            "loss": result.loss,
            "autolottery": result.autolottery,
            "enteredlottery": result.enteredlottery,
        }

        await userSchema.findOneAndDelete({ userid: message.author.id })
        await new userSchema(newUser).save()
        console.log("DONE")
    },
};

//do you mind testing bongo beta