const { AoiClient, LoadCommands, Util } = require("aoi.js");
const { parse, createAst } = require('@akarui/aoi.parser');
const { parseExtraOptions } = require('@akarui/aoi.parser/components');
const client = new AoiClient({
  token: "TOKENAQUI",
  prefix: ["prefixo1" ,"prefixo2"],
  intents: ["MessageContent", "Guilds", "GuildMessages"],
  events: ["onMessage", "onInteractionCreate"],
  database: {
    type: "aoi.db",
    db: require("@akarui/aoi.db"),
    dbType: "KeyValue",
    tables: ["main"],
    securityKey: "69699678969696969690123456786906",
  },
});

process.on('unhandRejection', (reason, promise) => {
  console.log(reason, promise)
});

process.on('uncaughtException', (error, origin) => {
   console.log(error, origin)
});

client.status({
  name: "mensagem do status",
  type: "PLAYING",
  time: 12,
});

Util.parsers.ErrorHandler = parse;
Util.parsers.OptionsParser = (data) => {
  return createAst(data).children.map(parseExtraOptions);
}

client.variables(require("./variaveis/principal.js"));

const loader = new LoadCommands(client);
loader.load(client.cmd, "./comandos/")