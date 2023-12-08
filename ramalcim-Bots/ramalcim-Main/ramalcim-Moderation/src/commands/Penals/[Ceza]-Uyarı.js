const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const coin = require("../../../../../../Global/schemas/coin");
const moment = require("moment");
const ceza = require("../../../../../../Global/schemas/ceza");
moment.locale("tr");
const conf = require("../../../../src/configs/sunucuayar.json")
const ramalcim = require("../../../../../../Global/BotSettings/Settings")
const penals = require("../../../../../../Global/schemas/penals")
const uyarisayi = require("../../../../../../Global/schemas/uyarisayi")
const cezapuan = require("../../../../../../Global/schemas/cezapuan")
const { red, ramal_Yes } = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../../../Global/Settings/Bot-Commands")
module.exports = {
  conf: {
    aliases: ["uyarı","warn"],
    name: "uyarı",
    help: "uyarı <favel/ID> <Sebep>",
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.CommandChannel;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.warnHammer.some(x => message.member.roles.cache.has(x)))    
    {
    message.react(red)
    message.channel.send({ content:  "Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) 
    {
    message.react(red)
    message.channel.send({ content: "Bir üye belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); }
    const reason = args.slice(1).join(" ") || "Belirtilmedi!";
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && member.roles.highest.position >= message.member.roles.highest.position) 
    {
    message.react(red)
    message.channel.send({ content:  "Kendinle aynı yetkide ya da daha yetkili olan birini uyaramazsın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); }
    if (!member.manageable) 
    {
    message.react(red)
    message.channel.send({ content: "Bu üyeyi susturamıyorum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); }
    await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -10 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 10 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content: `${member} üyesi \`uyarı cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
    const uyariData = await uyarisayi.findOne({ guildID: message.guild.id, userID: member.user.id });
    const penal = await client.penalize(message.guild.id, member.user.id, "WARN", false, message.author.id, reason);
    await uyarisayi.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { sayi: 1 } }, { upsert: true });
    const data = await penals.find({ guildID: message.guild.id, userID: member.user.id, type: "WARN" });
    message.react(ramal_Yes)
    message.reply({ content: `${ramal_Yes} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle uyarıldı! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
    if (ramalcim.Main.dmMessages) member.send({ content: `**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle uyarıldınız!`}).catch(() => {});
    
      const log = new EmbedBuilder()
      .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcıya **${message.author.tag}** tarafından Ses Mutesi atıldı.`)
      .addFields(
        { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
        { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
        { name: "Uyarı Sayısı",  value: `\`${uyariData ? Math.floor(parseInt(uyariData.sayi)) : 1} Uyarı\``, inline: true },
        { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
        )
      .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })

    message.guild.channels.cache.get(conf.warnLogChannel).send({ embeds: [log]});
  },
};

