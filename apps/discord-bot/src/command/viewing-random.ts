import { type CommandInteraction, EmbedBuilder, type GuildMember } from 'discord.js';
import { getUsers } from '#discord-bot/util/get-users';

export const viewingRandomCommand = async (interaction: CommandInteraction) => {
  if (!interaction.guild) {
    await interaction.reply('`/viewing_random` はサーバー内でのみ使用できます。');
    return;
  }

  await interaction.deferReply();

  await viewingRandom(
    async userId => {
      return await interaction.guild!.members.fetch(userId);
    },
    async embeds => {
      await interaction.editReply({ embeds });
    },
  );
};

export const viewingRandom = async (
  userIdToGuildMember: (userId: string) => Promise<GuildMember | null>,
  reply: (embeds: EmbedBuilder[]) => Promise<void>,
) => {
  const users = await getUsers();

  const embeds =
    users.length > 0
      ? await Promise.all(
          users.map(async user => {
            const randomVideo = user.viewingHistory[Math.floor(Math.random() * user.viewingHistory.length)];
            if (!randomVideo) {
              throw new Error('Failed to get random video');
            }

            const viewedUser = await userIdToGuildMember(user.id);
            if (!viewedUser) {
              throw new Error(`Failed to fetch user: ${user.id}`);
            }

            return new EmbedBuilder()
              .setTitle(`<@${viewedUser.id}> がこの動画を視聴しました`)
              .setThumbnail(`${viewedUser.user.displayAvatarURL()}`)
              .setDescription(`[${randomVideo.title}](https://www.youtube.com/watch?v=${randomVideo.id})`)
              .setImage(`${randomVideo.thumbnailUrl}`)
              .setFooter({ text: 'Random selection of videos viewed by each user individually' })
              .setTimestamp()
              .setColor(0xc37d9b);
          }),
        )
      : [
          new EmbedBuilder()
            .setTitle('視聴履歴がありません')
            .setDescription('まずは動画を視聴してみましょう！')
            .setFooter({ text: 'Random selection of videos viewed by each user individually' })
            .setTimestamp()
            .setColor(0xc37d9b),
        ];

  await reply(embeds);
};
