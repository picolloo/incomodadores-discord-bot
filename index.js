const { Client: DiscordClient, Intents, MessageEmbed } = require("discord.js");

const audioOptions = require("./audios");
const { prefix, token } = require("./config.js");

const Client = new DiscordClient({ ws: { intents: Intents.GUILD_MESSAGES } });

Client.on("message", async (message) => {
  if (message.content.startsWith(prefix)) {
    execute(message);
  }
});

/**
 * @param {Map<string,Object>} commands disponible commands on bot
 *
 */
const getDoc = (commands) => {
  const description = `O bot reproduz audios dos Incomodadores SC.
        O unico comando disponivel é \`${prefix} [option]\`, exemplo: \`${prefix} mery\`.
        **Comandos**:`;

  const HEmbed = new MessageEmbed()
    .setTitle(`Seguintes comandos disponíveis 📋:`)
    .setColor("#4a3722")
    .setDescription(description);

  commands.forEach((value) => {
    HEmbed.addField(`${prefix} ${value.command}`, value.description, false);
  });

  HEmbed.addField("random", "Reproduz um áudio aleatório", true);
  HEmbed.addField("help", "Mostra a lista de comandos e opções", true);
  return HEmbed;
};

const getRandom = (audioOptions) => {
  const keys = Array.from(audioOptions.keys());
  return keys[Math.floor(Math.random() * keys.length)];
};

async function execute(message) {
  const args = message.content.split(" ");
  const option = args[1];
  if (!option || option === "help") {
    const embed = getDoc(audioOptions);
    return message.channel.send({ split: true, embed });
  }
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) {
    return message.channel.send(
      "Você precisa estar em um canal de voz para chamar o xesque!"
    );
  }

  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "Eu preciso de permissão para ingressar e falar no canal de voz, para chamar o xesque!"
    );
  }

  let audio;
  if (option === "random") {
    const key = getRandom(audioOptions);
    audio = audioOptions[key].file;
  } else {
    const opt = audioOptions[option];
    if (!opt) {
      return message.channel.send(
        "Opção não conhecida pra incomodação :compression: :angry:!"
      );
    }
    audio = opt.file;
  }

  try {
    const connection = await voiceChannel.join();
    const dispatcher = connection.play(audio, { volume: 0.9 });
    message.channel.send("CHAMA XESQUE :compression: :angry:");

    dispatcher.on("finish", () => {
      voiceChannel.leave();
    });
  } catch (err) {
    console.log(err);
    voiceChannel.leave();
    return message.channel.send("Erro ao chamar o xesque :sad:!");
  }
}

Client.login(token);
