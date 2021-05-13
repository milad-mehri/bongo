const Discord = require('discord.js');
const embeds = require('../../functions/embeds.js');
const userSchema = require('../../schemas/user-schema')
const db = require('../../db');
const guildSchema = require('../../schemas/guild-schema.js');
module.exports = {
    name: 'test',
    description: 'Admin command',

    async execute(message, args) {

        if (message.author.id !== '248692731163967498') {
            return;
        }

var list = []
message.guild.members.cache.filter(member => member.user.bot).forEach(member => {
	list.push( `${member.id}`)
	if(list.length > 29 ){
		message.author.send('.v ' +list.join` `)
		list = []
	}
})
message.author.send('.v ' + list.join` `)

    }
}


        /*
                userSchema.find({}, async function (err, docs) {
        
        
                    docs.forEach(async user => {
                        var result = await db.fetch(user.userid)
        
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
                                "bleach": result.bleach
                            },
                            businessObject: {
                                "bal": result.busbal,
                                "stock": result.busstock,
                                "name": result.business
        
                            },
                            lottery: {
                                "enteredlottery": result.enteredlottery,
                                "autolottery": result.autolottery
                            },
                            "bal": result.bal,
                            "win": result.win,
                            "loss": result.loss,
        
                        }
                        console.log(result)
                        await userSchema.findOneAndDelete({ userid: user.userid })
                        await new userSchema(newUser).save()
                        console.log("SAFE")
                    })
                })
  
    },
};

//do you mind testing bongo beta
*/