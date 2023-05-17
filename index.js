const { AoiClient, LoadCommands } = require("aoi.js");
const aoijs = require("aoi.js")

const bot = new AoiClient({

    token: "seu token aqui",
    prefix: "$getGuildVar[prefixo]",
    intents: ["MessageContent", "Guilds", "GuildMessages", "GuildVoiceStates"],
    events: ["onMessage", "onInteractionCreate"],

    database: {

        type: "aoi.db",
        db: require("aoi.db"),
        tables: ["main"],
        path: "./database/",
        extraOptions: {
            dbType: "KeyValue"

        }

    }

});

const loader = new LoadCommands(bot);
loader.load(bot.cmd, "./comandos/")

bot.variables(require("./variaveis/principal.js"));

bot.readyCommand({

      channel:"id do canal de logs on",
      code:`
to on ze buceta
`

})

bot.status({
  text: "EstelarBot - Desenvolvimento.", 
  type: "STREAMING", 
  status: "online",
  URL: "https://youtube.com/@ferrazzzq",
  time: 12 

});
