import { Client, Events, GatewayIntentBits } from 'discord.js';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once(Events.ClientReady, c => {
  // biome-ignore lint/suspicious/noConsoleLog: This log is necessary to verify that the server is running properly.
  console.log(`IkihajiTube Bot is running as ${c.user.tag} 🚀`);
});

client.login(process.env['DISCORD_TOKEN']);
