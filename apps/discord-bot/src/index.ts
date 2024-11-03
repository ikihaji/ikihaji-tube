import { type ApplicationCommandData, Client, Events, GatewayIntentBits } from 'discord.js';
import cron from 'node-cron';
import { match } from 'ts-pattern';
import { registerCommand } from './command/register';
import { viewingRandom, viewingRandomCommand } from './command/viewing-random';
import { viewingSummary, viewingSummaryCommand } from './command/viewing-summary';

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.MessageContent,
  ],
});

const commands = [
  {
    name: 'register',
    description: 'Register a channel that IkihajiTube will run periodically.',
  },
  {
    name: 'viewing_random',
    description: 'Randomly display video that have been viewed by someone else.',
  },
  {
    name: 'viewing_summary',
    description: 'Display videos viewed by multiple users.',
  },
] as const satisfies ApplicationCommandData[];

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isCommand()) {
    return;
  }

  match(interaction.commandName as (typeof commands)[number]['name'])
    .with('register', () => registerCommand(interaction, client))
    .with('viewing_random', () => viewingRandomCommand(interaction))
    .with('viewing_summary', () => viewingSummaryCommand(interaction))
    .exhaustive();
});

client.on('guildCreate', async guild => {
  await guild.commands.set(commands);
});

client.once(Events.ClientReady, async client => {
  await client.application.commands.set(commands);

  await cron.schedule(process.env['CRON_SCHEDULE'] ?? '* * * * *', async () => {
    const webhookCollections = await Promise.all(
      client.guilds.cache.map(async guild => {
        const webhooks = await guild.fetchWebhooks();

        return webhooks.filter(webhook => client.user && webhook.owner?.id === client.user.id);
      }),
    );
    const webhooks = webhookCollections.flatMap(webhookCollection => webhookCollection.map(webhook => webhook));

    await Promise.all(
      webhooks.map(async webhook => {
        await viewingSummary(
          async userId => {
            const guild = await client.guilds.fetch(webhook.guildId);

            return await guild.members.fetch(userId);
          },
          async embeds => {
            await webhook.send({ embeds });
          },
        );

        await viewingRandom(
          async userId => {
            const guild = await client.guilds.fetch(webhook.guildId);

            return await guild.members.fetch(userId);
          },
          async embeds => {
            await webhook.send({ embeds });
          },
        );
      }),
    );
  });

  // biome-ignore lint/suspicious/noConsoleLog: This log is necessary to verify that the server is running properly.
  console.log(`IkihajiTube Bot is running as ${client.user.tag} 🚀`);
});

client.login(process.env['DISCORD_TOKEN']);
