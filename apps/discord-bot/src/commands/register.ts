import type { Client, CommandInteraction } from 'discord.js';
import { setOperationalChannel } from '#discord-bot/utils/channelStore';
import { startCronJob } from '#discord-bot/utils/scheduler';

export const handleRegisterCommand = async (interaction: CommandInteraction, client: Client) => {
  if (interaction!.channel!.id) {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log(`Set (channelId : ${interaction.channel!.id}) as channel ikihajiTube works in.`);
    await interaction.reply(`${interaction.channel}でikihajiTube botが運用するように設定されました。`);
  } else {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log('Failed to /register to set channel ikihajiTube works.');
    await interaction.reply('チャンネルを設定できませんでした。');
  }
  startCronJob(interaction!.channel!.id, client);
  setOperationalChannel(interaction!.channel!.id);
};
