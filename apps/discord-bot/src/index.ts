import { Client, Events, GatewayIntentBits } from 'discord.js';
import { handleRandomCommand } from './commands/random';
import { handleRegisterCommand } from './commands/register';
import { handleRelationCommand } from './commands/relation';

export const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// guildCreateイベントのリスナー
client.on('guildCreate', async guild => {
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log(`Joined a new guild: ${guild.name} (ID: ${guild.id})`);

  // スラッシュコマンドを登録する処理
  const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
    {
      name: 'relation',
      description: 'Get videos that relation to more than two users in ikihajiTube.',
    },
    {
      name: 'random',
      description: 'Get random videos that users in ikihajiTube watched.',
    },
    {
      name: 'register',
      description: 'Register a channel that ikihajiTube works in by using /register',
    },
  ];

  try {
    // スラッシュコマンドをそのギルドに登録
    await guild.commands.set(commands);
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log('Commands registered successfully.');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
});

// スラッシュコマンドを受け取ったときのイベント
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('pong');
  }

  if (commandName === 'relation') {
    await handleRelationCommand(interaction, client);
  }

  if (commandName === 'random') {
    await handleRandomCommand(interaction, client);
  }

  if (commandName === 'register') {
    handleRegisterCommand(interaction, client);
  }
});

client.once(Events.ClientReady, c => {
  // biome-ignore lint/suspicious/noConsoleLog: This log is necessary to verify that the server is running properly.
  console.log(`IkihajiTube Bot is running as ${c.user.tag} 🚀`);
});

client.login(process.env['DISCORD_TOKEN']);
