const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } = require("discord.js");
const Discord = require('discord.js');
const client = global.bot;
const conf = require("../../../../../../Global/BotSettings/Settings")
const ayarlar = require("../../../../src/configs/sunucuayar.json")
const { ramal_Yes } = require("../../../../src/configs/emojis.json")
const data = require("../../../../../../Global/schemas/serverSetting")
module.exports = {
  conf: {
    aliases: ["sesliteyit","steyit"],
    name: "sesteyit",
    help: "sesteyit",
    category: "kayıt",
    owner: true,
  },

  run: async (client, message, args) => {   //Yapilacak

    if(message.author.id != "962417173043753022") return;
    const doc = args[0];
    if(!doc) return message.reply({
        content: "Bir argüman belirtin. \`!sesli ac-kapat\`"
    })
    if(doc === "ac") {
        await data.findOneAndUpdate({guild: message.guild.id}, {$set: {sesteyit: true}})
        await message.react(ramal_Yes)
        await message.reply({
            content: "Sunucu sesli kayıt sistemi aktif edildi!"
        })
    }
    if(doc === "kapat") {
        await data.findOneAndUpdate({guild: message.guild.id}, {$set: {sesteyit: false}})
        await message.react(ramal_Yes)
        await message.reply({
            content: "Sunucu sesli kayıt sistemi kapatıldı!"
        })
    }
}
}

