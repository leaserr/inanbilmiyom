const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } = require("discord.js");
const Discord = require('discord.js');
const client = global.bot;
const conf = require("../../../../../../Global/BotSettings/Settings")
const ayarlar = require("../../../../src/configs/sunucuayar.json")
const { ramal_Yes } = require("../../../../src/configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["tagsizver"],
    name: "tagsizver",
    help: "tagsizver",
    category: "kayıt",
    owner: true,
  },

  run: async (client, message, args) => {
    let rolsuzuye = message.guild.members.cache.filter(m => m.user.username.includes(ayarlar.tag) && !m.roles.cache.has(ayarlar.ekipRolu) && !m.roles.cache.has(ayarlar.fakeAccRole) && !m.roles.cache.has(ayarlar.yasaklıRole) &&  !m.roles.cache.has(ayarlar.jailRole) && !ayarlar.unregRoles.some(x => m.roles.cache.has(x)))
    rolsuzuye.forEach(roluolmayanlar => { 
      roluolmayanlar.roles.add(ayarlar.ekipRolu).catch(err => {})
      roluolmayanlar.setNickname(roluolmayanlar.displayName.replace(ayarlar.ikinciTag, ayarlar.tag)).catch(err => {})
    });
    let rollüikinciTag = message.guild.members.cache.filter(m => !m.user.username.includes(ayarlar.tag) && m.roles.cache.has(ayarlar.ekipRolu) && !m.roles.cache.has(ayarlar.fakeAccRole) && !m.roles.cache.has(ayarlar.yasaklıRole) &&  !m.roles.cache.has(ayarlar.jailRole) && !ayarlar.unregRoles.some(x => m.roles.cache.has(x)))
        rollüikinciTag.forEach(rl => {
        rl.setNickname(rl.displayName.replace(ayarlar.tag, ayarlar.ikinciTag)).catch(err => {})
        rl.roles.remove(roller.tagRolü).catch(err => {})
    });
    message.channel.send(`Sunucuda taglı olup rolü olmayan \`${rolsuzuye.size}\` üyeye taglı rolü verildi, ve tagsız \`${rollüikinciTag.size}\` üyeden geri alınmaya başlandı!`).then(x => setTimeout(() => {
        x.delete()
    }, 7500));
    message.react(ramal_Yes)
    }
};