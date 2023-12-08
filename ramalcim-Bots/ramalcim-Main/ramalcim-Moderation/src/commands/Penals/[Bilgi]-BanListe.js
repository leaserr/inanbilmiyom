const { PermissionsBitField } = require("discord.js");
const coin = require("../../../../../../Global/schemas/coin");
const moment = require("moment");
const ceza = require("../../../../../../Global/schemas/ceza");
const cezapuan = require("../../../../../../Global/schemas/cezapuan")
const banLimit = new Map();
moment.locale("tr");
const conf = require("../../../../src/configs/sunucuayar.json")
const ramalcim = require("../../../../../../Global/BotSettings/Settings")
const { red, ramal_Yes } = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../../../Global/Settings/Bot-Commands")

module.exports = {
  conf: {
    aliases: ["banlist","yargılist","banliste"],
    name: "banliste",
    help: "banliste",
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) &&  !conf.banHammer.some(x => message.member.roles.cache.has(x))) { message.channel.send({ content:"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    message.react(red)
    return }
    let kanallar = ayar.CommandChannel;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    let toplamBan = 0
    await message.guild.bans.fetch().then(async (banned) => {
        toplamBan = banned.size
    })
    if(toplamBan == 0) {
      message.channel.send({ content: `Sunucuda banlanmış üye bulunmamaktadır.` });
    } else if(toplamBan > 0) {
    message.guild.bans.fetch().then(banned => {
    let text = banned.map(user => `ID:                | Kullanıcı Adı:\n${user.user.id} | ${user.user.tag}`).join('\n'); 
    message.channel.send({ content:`Sunucusunda bulunan toplam **${banned.size}** yasaklı kullanıcı listesi;`, files: [{ attachment: Buffer.from(text), name: "banlist.js" }] });
    })
  }
  },
};