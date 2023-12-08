const moment = require("moment");
require("moment-duration-format");
moment.locale("tr")
const conf = require("../../../../src/configs/sunucuayar.json");
const voiceUserParent = require("../../../../../../Global/schemas/voiceUserParent");
const messageUser = require("../../../../../../Global/schemas/messageUser");
const voiceUser = require("../../../../../../Global/schemas/voiceUser");
const cezapuan = require("../../../../../../Global/schemas/cezapuan");
const coin = require("../../../../../../Global/schemas/coin");
const taggeds = require("../../../../../../Global/schemas/taggeds");
const yetkis = require("../../../../../../Global/schemas/yetkis");
const ceza = require("../../../../../../Global/schemas/ceza");
const toplams = require("../../../../../../Global/schemas/toplams");
const inviterSchema = require("../../../../../../Global/schemas/inviter");
const tasks = require("../../../../../../Global/schemas/task")
const {  rewards, miniicon, mesaj2, staff, galp ,Muhabbet ,star , fill, empty, fillStart, emptyEnd, fillEnd, red , ramal_Yes} = require("../../../../src/configs/emojis.json");
const { ButtonStyle, TeamMember, EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionsBitField } = require("discord.js");
const ayar = require("../../../../../../Global/Settings/Bot-Commands")
const Seens = require("../../../../../../Global/schemas/seens")
const ms = require("../../../../../../Global/schemas/LastMessage")
const Discord = require("discord.js")
module.exports = {
  conf: {
    aliases: ["yme"],
    name: "yme",
    help: "yme",
    category: "stat",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.CommandChannel;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if(!conf.staffs.some(rol => message.member.roles.cache.has(rol))) return message.react(red)
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let loading = await message.channel.send(`Veriler yükleniyor...`)
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(!conf.staffs.some(rol => member.roles.cache.has(rol))) return message.react(red)
    let msj = await ms.findOne({guildId: message.guild.id, userID: member.id})

    const mtask = await tasks.find({ guildID: message.guild.id, userID: member.user.id });
    const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const messageWeekly = messageData ? messageData.weeklyStat : 0;
    const messageDaily = messageData ? messageData.dailyStat : 0;
    
    const coinData = await coin.findOne({ guildID: message.guild.id, userID: member.user.id });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });

    let kullArray = message.content.split(" ");
    let kullaniciId = kullArray.slice(1);
    let uye = message.mentions.members.first() || message.guild.members.cache.get(kullaniciId[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === kullaniciId.slice(0).join(" ") || x.user.username === kullaniciId[0]) || message.member;
    let SonGörülme = await Seens.findOne({userID: uye.id})
 

    const maxValue = client.ranks[client.ranks.indexOf(client.ranks.find(x => x.coin >= (coinData ? coinData.coin : 0)))] || client.ranks[client.ranks.length-1];
    const taggedData = await taggeds.findOne({ guildID: message.guild.id, userID: member.user.id });
    const toplamData = await toplams.findOne({ guildID: message.guild.id, userID: member.user.id });
    const yetkiData = await yetkis.findOne({ guildID: message.guild.id, userID: member.user.id });
    const cezaData = await ceza.findOne({ guildID: message.guild.id, userID: member.user.id });


const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
    const total = inviterData ? inviterData.total : 0;

        const category = async (parentsArray) => {
        const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.user.id });
        const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
        let voiceStat = 0;
        for (var i = 0; i <= voiceUserParentData.length; i++) {
          voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
        }
        return moment.duration(voiceStat).format("H [saat], m [dakika]");
      };
      
      let currentRank = client.ranks.filter(x => (coinData ? coinData.coin : 0) >= x.coin);
      currentRank = currentRank[currentRank.length-1];

      const coinStatus = message.member.hasRole(conf.staffs, false) && client.ranks.length > 0 ?
      `${currentRank ?`
      ${currentRank !== client.ranks[client.ranks.length-1] ? `Şu an ${Array.isArray(currentRank.role) ? currentRank.role.map(x => `<@&${x}>`).join(", ") : `<@&${currentRank.role}>`} rolündesiniz. ${Array.isArray(maxValue.role) ? maxValue.role.length > 1 ? maxValue.role.slice(0, -1).map(x => `<@&${x}>`).join(', ') + ' ve ' + maxValue.role.map(x => `<@&${x}>`).slice(-1) : maxValue.role.map(x => `<@&${x}>`).join("") : `<@&${maxValue.role}>`} rolüne ulaşmak için \`${maxValue.coin-coinData.coin}\` puan daha kazanmanız gerekiyor!` : "Şu an son yetkidesiniz! Emekleriniz için teşekkür ederiz. :)"}` : ` 
      Şuan ${message.member.roles.highest} rolündesiniz. ${Array.isArray(maxValue.role) ? maxValue.role.length > 1 ? maxValue.role.slice(0, -1).map(x => `<@&${x}>`).join(', ') + ' ve ' + maxValue.role.map(x => `<@&${x}>`).slice(-1) : maxValue.role.map(x => `<@&${x}>`).join("") : `<@&${maxValue.role}>`} rolüne ulaşmak için \`${maxValue.coin - (coinData ? coinData.coin : 0)}\`  Puan daha kazanmanız gerekiyor!`}` : ""
      
    



      const row = new ActionRowBuilder()
      .addComponents([
          new ButtonBuilder().setEmoji("995761593122037892").setCustomId("geri").setStyle(ButtonStyle.Secondary),
          new ButtonBuilder().setEmoji("995761597454753822").setCustomId("ileri").setStyle(ButtonStyle.Secondary),
          new ButtonBuilder().setEmoji("📱").setCustomId("telefon").setStyle(ButtonStyle.Secondary)
      
      ])
      const row2 = new ActionRowBuilder()
      .addComponents([
          new ButtonBuilder().setEmoji("995761593122037892").setCustomId("geri").setStyle(ButtonStyle.Secondary),
          new ButtonBuilder().setEmoji("995761597454753822").setCustomId("ileri").setStyle(ButtonStyle.Secondary),
          new ButtonBuilder().setEmoji("🖥️").setCustomId("pc").setStyle(ButtonStyle.Secondary)
      
      ])
      
      let zortSorumlulu = ["1146486065167876157", "1141003840162906212", "1141003839185616987","1141003838204149820","1141450074250031236","1141003836954255472","1141003835918274660","1142172268483588178","1141003834689335408"].filter(a => target.roles.cache.get(a)).map(a => `**${client.guilds.cache.get(message.guild.id).roles.cache.get(a).name}**`).join(" , ")            
      let seens = await Seens.findOne({userID: target.id});
      let sonMesaj = SonGörülme ? SonGörülme.lastMessage ? `<t:${String(SonGörülme.lastMessage).slice(0, 10)}:R>` : `Tespit Edilmedi` : `Tespit Edilmedi`
  let embedss = new Discord.EmbedBuilder()
      .setDescription(`
      ${client.emojis.cache.find(x => x.name === "ramal_info")} Genel Bilgiler;

\` Son Ses / Mesaj Aktifliği \` <t:${Math.floor(msj.date / 1000)}:R>
\` İlerleme Durumu \` ${progressBar(coinData ? coinData.coin : 0, maxValue.coin, 9)}
\` Görev Türü \` ${mtask.filter((x) => x.active).map((x) => `${x.message}`).join("\n\n")} 
\` Sorumluluk \`  ${zortSorumlulu ? zortSorumlulu : `${client.emojis.cache.find(x => x.name === "red")} Sorumluluk Almalısın.`}

*Yetkinin, yükseltim toplantısında yükselir duruma gelmesi için değerlendirme kısmın yeşil olmalı ve İlerleme durumu çubuğunda minimum %80 doldurmalısın.*

${client.emojis.cache.find(x => x.name === "ramal_info")} Görevler ve Yetki Yükseltim Bilgileri;

\` Görev İlerleme \` ${mtask.length === 0 ? "Görev Seçmelisin !" : mtask.filter((x) => x.active).map((x) => `\n${x.completedCount >= x.count ? `${message.guild.emojiGöster(emojis.yes)}` + " **Tamamlandı!**" : `${progressBar(x.completedCount, x.count, 8)} \`${x.type === "ses" || x.type === "yayin" || x.type == "camera" ? `${moment.duration(x.completedCount).format("H [saat], m [dk], s [sn]")} / ${moment.duration(x.count).format("H [saat], m [dk], s [sn]")}` : `${x.completedCount} / ${x.count}`}\``}`).join("\n\n")}

\` Görev Aktif \` \`${mtask.filter((x) => x.active).length}\`
\` Atlanacak Yetki \` ${Array.isArray(maxValue.role) ? maxValue.role.length > 1 ? maxValue.role.slice(0, -1).map(x => `<@&${x}>`).join(', ') + ' ve ' + maxValue.role.map(x => `<@&${x}>`).slice(-1) : maxValue.role.map(x => `<@&${x}>`).join("") : `<@&${maxValue.role}>`}
`)

let sayfalar = [`${target} adlı üyenin stat durumu;

${client.emojis.cache.find(x => x.name === "ramal_info")} Genel Bilgiler;

\` Son Ses / Mesaj Aktifliği \` <t:${Math.floor(msj.date / 1000)}:R>
\` İlerleme Durumu \` ${progressBar(coinData ? coinData.coin : 0, maxValue.coin, 9)}
\` Görev \` ${mtask.filter((x) => x.active).map((x) => `${x.message}`).join("\n\n")}
\` Sorumluluk \`  ${zortSorumlulu ? zortSorumlulu : `${client.emojis.cache.find(x => x.name === "wex_carpi")} Sorumluluk Almalısın.`}

*Yetkinin, yükselir duruma gelmesi için değerlendirme kısmın yeşil olmalı ve İlerleme durumu çubuğunu %100 doldurman geremektedir, sistem otomatik bir şekilde yetkini yükseltmektedir.*

${client.emojis.cache.find(x => x.name === "ramal_info")} Görevler ve Yetki Yükseltim Bilgileri;

\` Görev İlerleme  \` ${mtask.length === 0 ? "Görev Seçmelisin !" : mtask.filter((x) => x.active).map((x) => `\n${x.completedCount >= x.count ? `${message.guild.emojiGöster(emojis.yes)}` + " **Tamamlandı!**" : `${progressBar(x.completedCount, x.count, 8)} \`${x.type === "ses" || x.type === "yayin" || x.type == "camera" ? `${moment.duration(x.completedCount).format("H [saat], m [dk], s [sn]")} / ${moment.duration(x.count).format("H [saat], m [dk], s [sn]")}` : `${x.completedCount} / ${x.count}`}\``}`).join("\n\n")}

\` Üzerindeki Yetki \` ${message.member.roles.highest}
\` Atlanacak Yetki \` ${Array.isArray(maxValue.role) ? maxValue.role.length > 1 ? maxValue.role.slice(0, -1).map(x => `<@&${x}>`).join(', ') + ' ve ' + maxValue.role.map(x => `<@&${x}>`).slice(-1) : maxValue.role.map(x => `<@&${x}>`).join("") : `<@&${maxValue.role}>`}
`,`
${target} adlı üyenin stat durumu;

${client.emojis.cache.find(x => x.name === "ramal_info")} Ses Bilgiler;

\` Public Odalar \` ${await category(conf.publicParents)}
\` Private Odalar \` ${await category(conf.privateParents)}
\` Voice Confirmed Odalar \` ${await category(conf.registerParents)}

${client.emojis.cache.find(x => x.name === "ramal_info")} Puanlama Verileri;

\` Toplam Mesaj \` Yazı yazarak, ortalama olarak, \`+2\` puan kazanırsınız.
\` Toplam Kayıt \` Kayıt işlemi yaparak, \`+5.5\` puan kazanırsın.
\` Toplam Davet \` İnsanları davet ederek, \`+15\` puan kazanırsın.
\` Toplam Taglı \` Taglı üye belirleyerek, \`+25\` puan kazanırsınız.
\` Toplam Yetkili \` İnsanları yetkili yaparak, \`+30\` puan kazanırsın. 

*Yetkinin, yükselir duruma gelmesi için İlerleme durumu çubuğunu %100 doldurman geremektedir, sistem otomatik bir şekilde yetkini yükseltmektedir.*

${client.emojis.cache.find(x => x.name === "ramal_info")} Yükseltim; 
${progressBar(coinData ? coinData.coin : 0, maxValue.coin, 9)} \`${coinData ? coinData.coin : 0} / ${maxValue.coin}\`
`]; 
let embed2 = new Discord.EmbedBuilder()
.setDescription(`${target} adlı üyenin stat durumu;

${client.emojis.cache.find(x => x.name === "ramal_info")} Genel Bilgiler;

**Son Mesaj Aktifliği:** <t:${Math.floor(msj.date / 1000)}:R>
**Görev:** ${mtask.filter((x) => x.active).map((x) => `${x.message}`).join("\n\n")}
**Sorumluluk:** ${zortSorumlulu ? zortSorumlulu : `${client.emojis.cache.find(x => x.name === "red")} Sorumluluk Almalısın.`}

**Yetki İlerleme:** ${Array.isArray(maxValue.role) ? maxValue.role.length > 1 ? maxValue.role.slice(0, -1).map(x => `<@&${x}>`).join(', ') + ' ve ' + maxValue.role.map(x => `<@&${x}>`).slice(-1) : maxValue.role.map(x => `<@&${x}>`).join("") : `<@&${maxValue.role}>`}
**Görev İlerleme:** ${mtask.length === 0 ? "Görev Seçmelisin !" : mtask.filter((x) => x.active).map((x) => `\n${x.completedCount >= x.count ? `${message.guild.emojiGöster(emojis.yes)}` + " **Tamamlandı!**" : `${progressBar(x.completedCount, x.count, 8)} \`${x.type === "ses" || x.type === "yayin" || x.type == "camera" ? `${moment.duration(x.completedCount).format("H [saat], m [dk], s [sn]")} / ${moment.duration(x.count).format("H [saat], m [dk], s [sn]")}` : `${x.completedCount} / ${x.count}`}\``}`).join("\n\n")}

**Aktif Görev Sayısı:** ${mtask.filter((x) => x.active).length}
**Görev Toplam:** ${mtask.length}

*Yetkinin, yükselir duruma gelmesi için İlerleme durumu çubuğunu %100 doldurman geremektedir, sistem otomatik bir şekilde yetkini yükseltmektedir.*

      
             `)
        let sayfa = 1;
        loading.delete();
        let msg = await message.channel.send({ components: [row], embeds: [embedss] }); message.react(`${client.emojis.cache.find(x => x.name === "wex_tik")}`) 
        var filter = (button) => button.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
      
        collector.on('collect', async (button, user) => {      
          if(button.customId === "geri") {
              if (sayfa === 1) return;
              sayfa--;
              embedss.setDescription(sayfalar[sayfa-1]);
              button.update({embeds: [embedss]})
            
          };
          if (button.customId === "ileri") {
              if (sayfa === sayfalar.length) return;
              sayfa++;
              embedss.setDescription(sayfalar[sayfa-1]);
              button.update({embeds: [embedss]})
          };
          if (button.customId === "telefon") {
              button.update({embeds: [embed2], components: [row2]}, )
          };
          if (button.customId === "pc") {
              button.update({embeds: [embed], components: [row]}, )
          };
      
      
      })

      
function progressBar(value, maxValue, size) {
const fill = `${message.guild.emojiGöster(emojis.fill)}`;
const fillStart = `${message.guild.emojiGöster(emojis.fillStart)}`;
const fillEnd = `${message.guild.emojiGöster(emojis.fillEnd)}`;
const empty = `${message.guild.emojiGöster(emojis.empty)}`;
const emptyEnd = `${message.guild.emojiGöster(emojis.emptyEnd)}`;  
const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
const emptyProgress = size - progress > 0 ? size - progress : 0;

const progressText = fill.repeat(progress);
const emptyProgressText = empty.repeat(emptyProgress);

return emptyProgress > 0 ? fillStart+progressText+emptyProgressText+emptyEnd : fillStart+progressText+emptyProgressText+fillEnd;
};


function progressBar(value, maxValue, size) {
const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
const emptyProgress = size - progress > 0 ? size - progress : 0;

const progressText = fill.repeat(progress);
const emptyProgressText = empty.repeat(emptyProgress);

return emptyProgress > 0 ? fillStart+progressText+emptyProgressText+emptyEnd : fillStart+progressText+emptyProgressText+fillEnd;
}
  }
}



