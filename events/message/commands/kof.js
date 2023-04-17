const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = async (msg) => {
  const lastMessages = await msg.channel.messages.fetch({ limit: 100 });
  const messagesToDelete = lastMessages.filter(
    (msg) => msg.author.bot && msg.embeds.length > 0
  );

  msg.channel
    .bulkDelete(messagesToDelete)
    .then((deleted) =>
      console.log(
        `Deleted ${deleted.size} messages that contained the word "word_to_delete"`
      )
    )
    .catch(console.error);

  let embed = null;
  if (!msg.mentions.users.size) {
    return msg.channel.send(
      "Por favor, use o comando !kof marcando alguém. Ex.: !kof @leticia"
    );
  }
  const player1 = msg.author;
  const player2 = msg.mentions.users.first();
  let countP1 = 0;
  let countP2 = 0;
  embed = new EmbedBuilder()
    .setTitle("Hora do CACETE!")
    .setDescription(`FT: <@${player1.id}> VS <@${player2.id}>`)
    .setColor("NotQuiteBlack")
    .setFooter({ text: "Adicione ou remova 1 ponto clicando nos botões." })
    .setImage(
      "https://media.discordapp.net/attachments/1092668012177412237/1097612506404487319/e4fmqy1whmqi0yc9iqhq.gif"
    );

  let button1Plus = new ButtonBuilder()
    .setStyle(ButtonStyle.Success)
    .setLabel(`${player1.username} +1`)
    .setCustomId("p1_plus_1");

  let button1Minus = new ButtonBuilder()
    .setStyle(ButtonStyle.Danger)
    .setLabel(`${player1.username} -1`)
    .setCustomId("p1_minus_1");

  let button2Plus = new ButtonBuilder()
    .setStyle(ButtonStyle.Success)
    .setLabel(`${player2.username} +1`)
    .setCustomId("p2_plus_1");

  let button2Minus = new ButtonBuilder()
    .setStyle(ButtonStyle.Danger)
    .setLabel(`${player2.username} -1`)
    .setCustomId("p2_minus_1");

  let buttonEnds = new ButtonBuilder()
    .setStyle(ButtonStyle.Primary)
    .setLabel("Parar")
    .setCustomId("stop");

  let buttonResets = new ButtonBuilder()
    .setStyle(ButtonStyle.Secondary)
    .setLabel("Zerar")
    .setCustomId("reset");

  const buttons1 = new ActionRowBuilder().addComponents(
    button1Plus,
    button2Plus
  );

  const buttons2 = new ActionRowBuilder().addComponents(
    button1Minus,
    button2Minus
  );

  const buttons3 = new ActionRowBuilder().addComponents(
    buttonEnds,
    buttonResets
  );

  let m = await msg.channel.send({
    embeds: [embed],
    components: [buttons1, buttons2, buttons3],
  });

  const filter = (button) => button;
  // const collector = m.createMessageComponentCollector({ time: 3500 });
  const collector = await m.createMessageComponentCollector(filter, {
    time: 60000 * 120,
  });
  collector.on("collect", async (button) => {
    button.deferUpdate();
    if (button.user.id !== player1.id && button.user.id !== player2.id) {
      return m
        .reply({
          content: `Caí fora, ${button.user.username}, não mexa no placar!`,
        })
        .then((m) => {
          setTimeout(() => m.delete(), 5000);
        })
        .catch();
    }
    if (button.customId === "reset") {
      countP1 = 0;
      countP2 = 0;
      let embedZero = new EmbedBuilder()
        .setTitle("PLACAR DA FT")
        .addFields({
          name: `${countP1}`,
          value: `<@${player1.id}>`,
          inline: true,
        })
        .addFields({ name: "\u200B", value: "VS", inline: true })
        .addFields({
          name: `${countP2}`,
          value: `<@${player2.id}>`,
          inline: true,
        })
        .setFooter({ text: "Adicione ou remova 1 ponto clicando nos botões." });

      await button.message.edit({
        embeds: [embedZero],
        components: [buttons1, buttons2, buttons3],
      });
    } else if (button.customId === "p1_plus_1") {
      countP1 = countP1 + 1;
      let embed1 = new EmbedBuilder()
        .setTitle("PLACAR DA FT")
        .addFields({
          name: `${countP1}`,
          value: `<@${player1.id}>`,
          inline: true,
        })
        .addFields({ name: "\u200B", value: "VS", inline: true })
        .addFields({
          name: `${countP2}`,
          value: `<@${player2.id}>`,
          inline: true,
        })
        .setFooter({ text: "Adicione ou remova 1 ponto clicando nos botões." });

      await button.message.edit({
        embeds: [embed1],
        components: [buttons1, buttons2, buttons3],
      });
    } else if (button.customId === "p1_minus_1") {
      if (countP1 > 0) countP1 = countP1 - 1;

      let embed2 = new EmbedBuilder()
        .setTitle("PLACAR DA FT")
        .addFields({
          name: `${countP1}`,
          value: `<@${player1.id}>`,
          inline: true,
        })
        .addFields({ name: "\u200B", value: "VS", inline: true })
        .addFields({
          name: `${countP2}`,
          value: `<@${player2.id}>`,
          inline: true,
        })
        .setFooter({ text: "Adicione ou remova 1 ponto clicando nos botões." });

      await button.message.edit({
        embeds: [embed2],
        components: [buttons1, buttons2, buttons3],
      });
    } else if (button.customId === "p2_plus_1") {
      countP2 = countP2 + 1;

      let embed3 = new EmbedBuilder()
        .setTitle("PLACAR DA FT")
        .addFields({
          name: `${countP1}`,
          value: `<@${player1.id}>`,
          inline: true,
        })
        .addFields({ name: "\u200B", value: "VS", inline: true })
        .addFields({
          name: `${countP2}`,
          value: `<@${player2.id}>`,
          inline: true,
        })
        .setFooter({ text: "Adicione ou remova 1 ponto clicando nos botões." });

      await button.message.edit({
        embeds: [embed3],
        components: [buttons1, buttons2, buttons3],
      });
    } else if (button.customId === "p2_minus_1") {
      if (countP2 > 0) countP2 = countP2 - 1;

      let embed4 = new EmbedBuilder()
        .setTitle("PLACAR DA FT")
        .addFields({
          name: `${countP1}`,
          value: `<@${player1.id}>`,
          inline: true,
        })
        .addFields({ name: "\u200B", value: "VS", inline: true })
        .addFields({
          name: `${countP2}`,
          value: `<@${player2.id}>`,
          inline: true,
        })
        .setFooter({ text: "Adicione ou remova 1 ponto clicando nos botões." });

      await button.message.edit({
        embeds: [embed4],
        components: [buttons1, buttons2, buttons3],
      });
    } else if (button.customId === "stop") {
      let embed5 = new EmbedBuilder()
        .setTitle("PLACAR DA FT")
        .addFields({
          name: `${countP1}`,
          value: `<@${player1.id}>`,
          inline: true,
        })
        .addFields({ name: "\u200B", value: "VS", inline: true })
        .addFields({
          name: `${countP2}`,
          value: `<@${player2.id}>`,
          inline: true,
        })
        .addFields({
          name: `Resultado final`,
          value: `${
            countP1 === countP2
              ? "ninguém venceu 🤭"
              : countP1 > countP2
              ? "<@" + player1.id + "> 👑️"
              : "<@" + player2.id + "> 👑️"
          }`,
        })
        .setImage(
          countP1 === countP2
            ? `https://cdn.discordapp.com/attachments/1092668012177412237/1097097122102399038/kofomg380.png`
            : countP1 > countP2
            ? `https://cdn.discordapp.com/avatars/${player1.id}/${player1.avatar}.png?size=256`
            : `https://cdn.discordapp.com/avatars/${player2.id}/${player2.avatar}.png?size=256`
        );
      collector.stop();
      await button.message.edit({
        embeds: [embed5],
        components: [],
      });
    }
  });
};
