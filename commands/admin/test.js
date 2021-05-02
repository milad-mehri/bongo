/*const Discord = require('discord.js');
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
        var guilds = [
            '789375325288267788', '799160748865093662',
            '799575531757633578', '799906495328288778',
            '743300457069412453', '771245661307011072',
            '749375963036647504', '792582986108633088',
            '816503827540213790', '762725737828057198',
            '813449895829700648', '817275698674139156',
            '635723675282440192', '815832026748813362',
            '803292414269587476', '808033962378395708',
            '818352005303107644', '807346861282164780',
            '720148770645475379', '815036830079647774',
            '584653794508275725', '727629284885135552',
            '709652932399726593', '709400011892326401',
            '828795221722267728', '828966701957644289',
            '828819434700537866', '831844603082702858',
            '832252662984605739', '706778868379549714',
            '817950956204458004', '809263447509303316',
            '763669299889831936'
        ]
        var result;
        guilds.forEach(async a => {
            result = await db.fetchguild(a)
            result.disabled['rob'] = true
            await db.guildset(message.guild.id, "disabled", result.disabled)
            console.log("DO")
        })






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
*/
//do you mind testing bongo beta*/