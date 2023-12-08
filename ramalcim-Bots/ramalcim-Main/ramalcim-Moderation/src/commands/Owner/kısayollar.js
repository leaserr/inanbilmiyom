const { EmbedBuilder, PermissionFlagsBits, StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, Colors, PermissionsBitField } = require('discord.js')
const Discord = require('discord.js');
const client = global.bot;
const { star } = require("../../../../src/configs/emojis.json")
const allah = require("../../../../../../config.json");

module.exports = {
  conf: {
    aliases: ["kısayollar"],
    name: "kısayollar",
    help: "kısayollar",
    category: "sahip",
    owner: true,
  },
 
    run: async (client, message, args, prefix) => {
		let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

			const kısayollar = new ActionRowBuilder()
			.addComponents(
			  new StringSelectMenuBuilder()
				.setCustomId('kısayollar')
				.setPlaceholder('74 Adet Komut Bulunmakta!')
				.addOptions([
				  {
					label: 'Kullanıcı Komutları',
					description: 'Kullanıcı Komutlar kategorisinin yardım bilgileri için tıkla!',
					value: 'kısayollar1',
				  },					
				  {
					label: 'Kayıt Komutları',
					description: 'Kayıt Komutlar kategorisinin yardım bilgileri için tıkla!',
					value: 'kısayollar3',
				  },
				  {
					label: 'Cezalandırma Komutları',
					description: 'Cezalandırma Komutlar kategorisinin yardım bilgileri için tıkla!',
					value: 'kısayollar4',
				  },
				  {
					label: 'Stat Komutları',
					description: 'Stat Komutlar kategorisinin yardım bilgileri için tıkla!',
					value: 'kısayollar5',
				  },
				  {
					label: 'Yetkili Komutları',
					description: 'Yetkili Komutlar kategorisinin yardım bilgileri için tıkla!',
					value: 'kısayollar6',
				  },
				  {
					label: 'Kurucu Komutları',
					description: 'Kurucu Komutlar kategorisinin yardım bilgileri için tıkla!',
					value: 'kısayollar7',
				  },
				  {
					label: 'Sahip Komutları',
					description: 'Sahip Komutlar kategorisinin yardım bilgileri için tıkla!',
					value: 'kısayollar8',
				  },
				]),
			);

            let butttonRow = new ActionRowBuilder()
            .addComponents(
                 new ButtonBuilder()
                .setCustomId("merdor")
                .setStyle(ButtonStyle.Danger)
                .setLabel("Keasy ❤️ ꏬ M E R L I N")
                .setDisabled(true)
            )

            await message.channel.send({ embeds: [new EmbedBuilder().setAuthor({name:message.guild.name}).setThumbnail(message.guild.iconURL({dynamic: true})).setDescription(`
			> Aşağıda Oluşan Menüden **${message.guild.name}** 
			> Sunucusunun Bot Komutlarını İncelemek İçin 
			> Menüye Tıklayabilirsiniz`)],  components: [kısayollar, butttonRow] });

}
}

  client.on('interactionCreate', interaction => {

    if (!interaction.isStringSelectMenu()) return;

if (interaction.values[0] === "kısayollar1") {
    interaction.reply({ content : `
\`\`\`
${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "kullanıcı").map(x => `.${x.conf.help}`).join('\n')}
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "kısayollar2") {
    interaction.reply({ content : `
\`\`\`
${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "market").map(x => `.${x.conf.help}`).join('\n')}
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "kısayollar3") {
    interaction.reply({ content : `
\`\`\`
${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "kayıt").map(x => `.${x.conf.help}`).join('\n')}
\`\`\`
`, ephemeral: true })
};
  
if (interaction.values[0] === "kısayollar4") {
    interaction.reply({ content : `
\`\`\`
${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "cezalandırma").map(x => `.${x.conf.help}`).join('\n')}
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "kısayollar5") {
    interaction.reply({ content : `
\`\`\`
${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "stat").map(x => `.${x.conf.help}`).join('\n')}
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "kısayollar6") {
    interaction.reply({ content : `
\`\`\`
${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "yetkili").map(x => `.${x.conf.help}`).join('\n')}
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "kısayollar7") {
    interaction.reply({ content : `
\`\`\`
${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "yönetim").map(x => `.${x.conf.help}`).join('\n')}
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "kısayollar8") {
    interaction.reply({ content : `
\`\`\`
${client.commands.filter(x => x.conf.category !== "-" && x.conf.category == "sahip").map(x => `.${x.conf.help}`).join('\n')}
\`\`\`
`, ephemeral: true })
};
});