const client = global.bot;
const conf = require("../../../../src/configs/sunucuayar.json")
const Discord = require("discord.js")
const kanallar = require("../../../../src/configs/sunucuayar.json")
const { ramal_Yes, red } = require("../../../../src/configs/emojis.json")
module.exports = {
    conf: {
      aliases: ["dagit","dağıt"],
      name: "dagit",
      help: "dagit <@favel/ID>",   //denemedim hatali ola bilir
      category: "yönetim",
    },
  
    run: async (client, message, args, embed, durum) => {

        if (durum) {
            let voiceChannel = message.member.voice.channelID;
            if (!voiceChannel) return message.reply("Herhangi bir ses kanalında değilsin!");
            let publicRooms = message.guild.channels.cache.filter(c => c.parentID === kanallar.publicParents && c.id !== kanallar.SleepsRoom && c.id && c.type === "voice");
            message.member.voice.channel.members.array().forEach((m, index) => {
              setTimeout(() => {
                 if (m.voice.channelID !== voiceChannel) return;
                 m.voice.setChannel(publicRooms.random().id);
              }, index*1000);
            });
            message.reply(`\`${message.member.voice.channel.name}\` adlı ses kanalındaki üyeler rastgele public odalara dağıtılmaya başlandı!`);
        }
    }
}