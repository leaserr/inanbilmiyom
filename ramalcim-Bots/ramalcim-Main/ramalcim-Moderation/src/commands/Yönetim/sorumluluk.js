const { PermissionsBitField, ComponentType, EmbedBuilder, Client, Message, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const { red, ramal_Yes } = require("../../../../src/configs/emojis.json")
let ayar = require("../../../../src/configs/sunucuayar.json"); 
const moment = require("moment");
require("moment-duration-format");
const client = global.bot;

module.exports = {
    conf: {
      aliases: ["sorumluluk"],
      name: "sorumluluk",
      help: "sorumluluk <@favel/ID>",
      category: "yönetim",
    },
  
    run: async (client, message, args, embed) => {
      if(!ayar.rolverici.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
      { 
      message.react(red)
      message.reply({ content:`Yetkin bulunmamakta dostum.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
      return }

let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
if (!uye) return message.reply({ content:` • Örnek; .sorumluluk @favel/ID`});

const perm = new ActionRowBuilder()
.addComponents(
    new StringSelectMenuBuilder()
        .setCustomId('perm')
        .setPlaceholder('Eklemek istediğiniz perm için tıklayınız')
        .addOptions([
            {
                label: 'Public Sormlusu',
                value: 'vip',
            },
            {
                label: 'invite sorumlusu',
                value: 'müzisyen',
            },						
            {
                label: 'Streamer Sorumlusu',
                value: 'tasarımcı',
            },
            {
                label: 'Teyit Sorumlusu',
                value: 'streamer',
            },
            {
                label: 'Chat Sorumlusu',
                value: 'terapi',
            },
        ]),
);

const msg = await message.reply({ content : `${uye} kullanıcısına perm eklemek için aşağıdaki menüyü kullanınız`, components: [perm] });

const filter = i => i.user.id == message.author.id 
const collector = msg.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 1, time: 20000 });
collector.on("collect", async (interaction) => {

     if (interaction.values[0] === "vip") {
        uye.roles.cache.has(ayar.pub) ? uye.roles.remove(ayar.pub) : uye.roles.add(ayar.pub);
        if(!uye.roles.cache.has(ayar.pub)) {
          client.channels.cache.find(x => x.name == "sorumluluk_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Public** adlı rol verildi.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişiye **Public** rolü verildi.`, components: [] });
        } else {
          client.channels.cache.find(x => x.name == "sorumluluk_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Public** adlı rol geri alındı.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişinin **Public** rolü geri alındı.`, components: [] });
        };
     }

     if (interaction.values[0] === "müzisyen") {
        uye.roles.cache.has(ayar.invite) ? uye.roles.remove(ayar.invite) : uye.roles.add(ayar.invite);
        if(!uye.roles.cache.has(ayar.invite)) {
          client.channels.cache.find(x => x.name == "sorumluluk_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Invite** adlı rol verildi.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişiye **Invite** rolü verildi.`, components: [] });
        } else {
          client.channels.cache.find(x => x.name == "sorumluluk_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Invite** adlı rol geri alındı.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişinin **Invite** rolü geri alındı.`, components: [] });
        };
     }

    if (interaction.values[0] === "tasarımcı") {
        uye.roles.cache.has(ayar.streamers) ? uye.roles.remove(ayar.streamers) : uye.roles.add(ayar.streamers);
        if(!uye.roles.cache.has(ayar.streamers)) {
          client.channels.cache.find(x => x.name == "sorumluluk_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Streamer** adlı rol verildi.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişiye **Streamer** rolü verildi.`, components: [] });
        } else {
          client.channels.cache.find(x => x.name == "sorumluluk_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Streamer** adlı rol geri alındı.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişinin **Streamer** rolü geri alındı.`, components: [] });
        };
     }

    if (interaction.values[0] === "streamer") {
        uye.roles.cache.has(ayar.teyits) ? uye.roles.remove(ayar.teyits) : uye.roles.add(ayar.teyits);
        if(!uye.roles.cache.has(ayar.teyits)) {
          client.channels.cache.find(x => x.name == "sorumluluk_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Teyit** adlı rol verildi.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişiye **Teyit** rolü verildi.`, components: [] });
        } else {
          client.channels.cache.find(x => x.name == "sorumluluk_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Teyit** adlı rol geri alındı.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişinin **Teyit** rolü geri alındı.`, components: [] });
        };
     }

     if (interaction.values[0] === "terapi") {
      uye.roles.cache.has(ayar.chatsorumlu) ? uye.roles.remove(ayar.chatsorumlu) : uye.roles.add(ayar.chatsorumlu);
      if(!uye.roles.cache.has(ayar.chatsorumlu)) {
        client.channels.cache.find(x => x.name == "sorumluluk_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Chat** adlı rol verildi.`)]})
        msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişiye **Chat** rolü verildi.`, components: [] });
      } else {
        client.channels.cache.find(x => x.name == "sorumluluk_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Chat** adlı rol geri alındı.`)]})
        msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişinin **Chat** rolü geri alındı.`, components: [] });
      };
   }

    })

}
}