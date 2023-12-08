const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const ramalcim = require("../../../../../../Global/BotSettings/Settings")
const conf = require("../../../../../ramalcim-Main/src/configs/sunucuayar.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
let BanLimit = {};
module.exports = async (member) => {

let entry = await member.guild.fetchAuditLogs({ type: AuditLogEvent.MemberBanAdd }).then(audit => audit.entries.first());
if (!entry || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "banandkick") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
const { action } = member;
if (action !== AuditLogEvent.MemberBanAdd) return;

let members = member.guild.members.cache.get(entry.executor.id); 

const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
    .setCustomId("cezaac")
    .setDisabled(members.bannable ? false : true)
    .setLabel("Ceza Kaldır").setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
    .setCustomId("yetkileriac")
    .setLabel("Yetki Aç").setStyle(ButtonStyle.Danger)
  )

let victimMember = await member.guild.members.fetch(entry.executor.id).then(m => m).catch(() => undefined);
if (BanLimit[entry.executor.id] && BanLimit[entry.executor.id].Now + 1 > ramalcim.Guard.Limit.Ban) {
    if (victimMember) {
        BanLimit[entry.executor.id] = {
            Now: 1,
            Last: Date.now() 
        }
    }
    BanLimit[entry.executor.id].Now += 1;

const ramal = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
${entry.executor} yetkilisi **${ramalcim.Guard.Limit.Ban}** Ban limitini geçtiği için kendisi banlandı ve banlanan üyenin banı kaldırıldı.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Kullanıcı: \`${member.user.tag}\` - \`${member.user.id}\`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

let ramalGuardLog = await member.guild.channels.cache.find(x => x.name == "protection_log").send({ embeds: [ramal], components: [row] });

var filter = (button) => conf.sahipRolu.some(x => x == button.member.roles.cache.has(x)) || ramalcim.owners.includes(button.user.id);
const collector = await ramalGuardLog.createMessageComponentCollector({ filter });

collector.on('collect', async (button) => {
  if (button.customId == "cezaac") {
    button.guild.members.unban(entry.executor.id, `Buton Üzerinden Guard Banı Kaldırıldı!`)
      button.reply({ content: `${button.user} Tebrikler! Başarılı bir şekilde ${entry.executor} (\`${entry.executor.id}\`) kişisinin banını kaldırdın!`, ephemeral: true })
  }
  if (button.customId == "yetkileriac") {
      client.allPermissionOpen();
      button.reply({ content: `${button.user} Tebrikler! Başarılı bir şekilde sunucudaki rollerin yetkilerini açtın!`, ephemeral: true })
  }
})
return; 
} else if (!BanLimit[entry.executor.id]) {
    BanLimit[entry.executor.id] = {
        Now: 1,
        Last: Date.now()
    };

const ramal = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
${entry.executor} yetkilisi kalan Ban Limit: **${1}/${ramalcim.Guard.Limit.Ban}**.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Kullanıcı: \`${member.user.tag}\` - \`${member.user.id}\`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

return member.guild.channels.cache.find(x => x.name == "protection_log").send({ embeds: [ramal] });
} else {
    BanLimit[entry.executor.id].Now += 1;
    setTimeout(() => {
        BanLimit[entry.executor.id] = {
            Now: 1,
            Last: Date.now()
        }
    }, 1000 * 60 * 3);

const ramal = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
${entry.executor} yetkilisi kalan Ban Limit: **${BanLimit[entry.executor.id].Now}/${ramalcim.Guard.Limit.Ban}**.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Kullanıcı: \`${member.user.tag}\` - \`${member.user.id}\`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

return member.guild.channels.cache.find(x => x.name == "protection_log").send({ embeds: [ramal] });
}
};

module.exports.conf = {
  name: "guildBanAdd",
};