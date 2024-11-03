import { ChannelType, type Client, type CommandInteraction } from 'discord.js';

export const registerCommand = async (interaction: CommandInteraction, client: Client) => {
  if (interaction.channel === null || interaction.channel.type !== ChannelType.GuildText) {
    await interaction.reply('`/register` はテキストチャンネルでのみ使用できます。');
    return;
  }

  const webhooks = await interaction.channel.fetchWebhooks();
  const webhook =
    webhooks.find(webhook => client.user && webhook.owner?.id === client.user.id) ??
    (await interaction.channel.createWebhook({
      name: 'IkihajiTube',
      avatar: 'https://avatars.githubusercontent.com/u/186720720',
      reason: 'Webhook to send viewing summary to the channel.',
    }));

  await interaction.reply(`${interaction.channel} で ${webhook.name} が定期実行するように設定しました。`);
};
