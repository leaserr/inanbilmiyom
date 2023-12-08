const Discord = require("discord.js");
const messageUser = require("../../../../../../Global/schemas/messageUser");
const { red, ramal_Yes } = require("../../../../src/configs/emojis.json")
const { PermissionFlagsBits, ChannelType, PermissionsBitField } = require("discord.js");
const { guildPerms } = require("../../../../../../Global/schemas/guildPerms")
const system = require("../../../../../../Global/BotSettings/Settings")
const Koruma = require("../../../../../ramalcim-Guard/src/Models/Koruma")
const SafeMember = require("../../../../../ramalcim-Guard/src/Models/Koruma")
module.exports = {
  conf: {
    aliases: ["ytpanel"],
    name: "yetkipanel",
    help: "yetkipanel",
    category: "owner"    
},
run: async (client, message, args, embed, interaction) => {

  const row = new Discord.ActionRowBuilder()
.addComponents(
new Discord.ButtonBuilder()
.setCustomId("ac")
.setLabel("Yetkileri Aç")
.setStyle(Discord.ButtonStyle.Secondary)
.setEmoji("915754671728132126"),
new Discord.ButtonBuilder()
.setCustomId("kapat")
.setLabel("Yetkileri Kapat")
.setStyle(Discord.ButtonStyle.Secondary)
.setEmoji("920412153712889877"),
);
const mesaj = await message.reply({embeds: [embed.setDescription(`${message.member}, Merhaba **${message.guild.name}** Sunucusunun Toplam Stat Verilerini Sıfırlamak İstediğine Emin Misin.?`).setFooter({text: 'Not: Aşağıdaki Button Yardımıyla İşlemi Seçiniz'})], components: [row]})
var filter = (interaction) => interaction.user.id === message.member.id;
let collector = await mesaj.createMessageComponentCollector({ filter })

collector.on("collect", async (interaction) => {
if(interaction.customId === "ac") {
row.components[0].setDisabled(true);
row.components[1].setDisabled(true);
const perms = [PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageEmojisAndStickers, PermissionsBitField.Flags.ManageWebhooks];
let roller = interaction.guild.roles.cache.filter(rol => rol.editable).filter(rol => perms.some(yetki => rol.permissions.has(yetki)))
if(mesaj) mesaj.edit({embeds: [embed.setDescription(`${ramal_Yes} Başarıyla Yetkiler Açıldı ${roller.map(x => x).join(", ")}`)], components: [row]})
roller.forEach(async (rol) => {
  await SafeMember.updateOne({ Role: rol.id }, {$set: {"guildID": interaction.guild.id, "Permissions": rol.permissions.bitfield }}, {upsert: true})
  await rol.setPermissions(0n)
}
)


if(interaction.customId === "kapat") {
row.components[0].setDisabled(true);
row.components[1].setDisabled(true);  
let veri = await SafeMember.find({});
      veri.filter(x => interaction.guild.roles.cache.get(x.Role)).forEach(async (data) => {
          let rolgetir = interaction.guild.roles.cache.get(data.Role)
          if(rolgetir) rolgetir.setPermissions(data.Permissions);
      })
      await SafeMember.deleteMany({ guildID: interaction.guild.id });
if(mesaj) mesaj.edit({embeds: [embed.setDescription(`${ramal_Yes} Başarıyla Yetkiler Kapatıldı ${veri.map((x, key) => interaction.guild.roles.cache.get(x.Role)).join(", ")}`)], components: [row]})

}
}
}
)
}
}

