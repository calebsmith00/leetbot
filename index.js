// Import environment variables
import dotenv from "dotenv";
import { handleTicket } from "./cmds.js";
dotenv.config();

import { Client, GatewayIntentBits } from "discord.js";

const token = process.env.CLIENT_TOKEN;
const appID = process.env.APPLICATION_ID;
const guildID = process.env.GUILD_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
  ],
});

client.once("ready", () => {
  console.log(`${client.user.tag} has logged in!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  switch (commandName) {
    case "ticket":
      const message = interaction.options.get("message");
      if (!message.value) return;
      handleTicket({ interaction, message: message.value });
  }
});

client.login(token);

export { guildID, client };
