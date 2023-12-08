const { EmbedBuilder, ButtonBuilder, Discord } = require("discord.js")
const client = global.client;
const data = require("../../../../../../Global/schemas/serverSetting")
const { ramal_Yes } = require("../../../../src/configs/emojis.json")
module.exports = {
    conf: {
      aliases: ["system"],
      name: "system",
      owner: true,
      category: "owner"
    },
  
    run: async (client, message, args, EmbedBuilder) => {
    if(message.author.id != "962417173043753022") return message.react("❌");
    const arg = args[0]
    const db = await data.findOne({guild:message.guild.id})
    if(["sw", "guild", "guildID", "guildId"].some(x => x == arg)) {
        await data.findOneAndUpdate({ guild:message.guild.id }, { $set:{ guild:message.guild.id , sesteyit:false } }, { upsert:true })
        await message.react(ramal_Yes)
    }

    if(["yas"].some(x => x == arg)) {
        if(!args[1]) return message.react(red)
        await data.findOneAndUpdate({ guild:message.guild.id }, { $set:{ yasLimit:args[1]} }, { upsert:true })
        await message.react(ramal_Yes)
    }

    if(["banLimit"].some(x => x == arg)) {
        if(!args[1]) return message.react(red)
        await data.findOneAndUpdate({ guild:message.guild.id }, { $set:{ banLimit:args[1]} }, { upsert:true })
        await message.react(ramal_Yes)
    }

    
    if(["jailLimit"].some(x => x == arg)) {
        if(!args[1]) return message.react(red)
        await data.findOneAndUpdate({ guild:message.guild.id }, { $set:{ jailLimit:args[1]} }, { upsert:true })
        await message.react(ramal_Yes)
    }

    if(["muteLimit"].some(x => x == arg)) {
        if(!args[1]) return message.react(red)
        await data.findOneAndUpdate({ guild:message.guild.id }, { $set:{ muteLimit:args[1]} }, { upsert:true })
        await message.react(ramal_Yes)
    }

    if(!arg) {

        message.channel.send({embeds:[EmbedBuilder
            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})})
            .setDescription(`
            \`\`\`BOT SETTINGS\`\`\`
            **Server ID:** (${!db.guild ? `\`Kapalı\``:`${db.guild}`})
            **yasLimit:** (${!db.yasLimit ? `\`Kapalı\``:`${db.yasLimit}`})
            **banLimit:** (${!db.banLimit ? `\`Kapalı\``:`${db.banLimit}`})
            **jailLimit:** (${!db.jailLimit ? `\`Kapalı\``:`${db.jailLimit}`})`)]})
            

        }
          
        }

}