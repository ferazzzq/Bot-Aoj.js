const express = require('express')
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);

const { AoiClient, LoadCommands, Util } = require("aoi.js");
const { parse, createAst } = require('@akarui/aoi.parser');
const { parseExtraOptions } = require('@akarui/aoi.parser/components');
const client = new AoiClient({
  token: "SEU_ToKeN",
  prefix: "SEU_ToKeN",
  intents: ["MessageContent", "Guilds", "GuildMessages"],
  events: ["onMessage", "onInteractionCreate"],
  disableAoiDB: true,
  database: {
    type: "aoi.db",
      db: require("@akarui/aoi.db"),
      dbType: "KeyValue",
      tables: ["main"],
      securityKey: "uma key com 32 caracteres.",
  },
});

process.on('unhandRejection', (reason, promise) => {
  console.log(reason, promise)
});

process.on('uncaughtException', (error, origin) => {
   console.log(error, origin)
});

client.status({
  name: "bot focused on global economy.",
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
