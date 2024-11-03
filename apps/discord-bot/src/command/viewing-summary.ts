import type { User, Video } from '@ikihaji-tube/core/model';
import { type CommandInteraction, EmbedBuilder, type GuildMember } from 'discord.js';
import { getUsers } from '#discord-bot/util/get-users';

type VideoAndUserRelation = {
  video: Video;
  users: User[];
};

export const viewingSummaryCommand = async (interaction: CommandInteraction) => {
  if (!interaction.guild) {
    await interaction.reply('`/viewing_summary` はサーバー内でのみ使用できます。');
    return;
  }

  await interaction.deferReply();

  await viewingSummary(
    async userId => {
      return await interaction.guild!.members.fetch(userId);
    },
    async embeds => {
      await interaction.editReply({ embeds });
    },
  );
};

export const viewingSummary = async (
  userIdToGuildMember: (userId: string) => Promise<GuildMember | null>,
  reply: (embeds: EmbedBuilder[]) => Promise<void>,
) => {
  const users = await getUsers();

  const videoAndUserRelations = users
    .reduce<VideoAndUserRelation[]>((acc, user) => {
      user.viewingHistory.forEach(video => {
        const videoAndUserRelation = acc.find(relation => relation.video.id === video.id);
        if (videoAndUserRelation) {
          videoAndUserRelation.users.push(user);
        } else {
          acc.push({ video, users: [user] });
        }
      });

      return acc;
    }, [])
    .filter(relation => relation.users.length >= 2);

  const embeds =
    videoAndUserRelations.length > 0
      ? await Promise.all(
          videoAndUserRelations.map(async relation => {
            const coViewers = await Promise.all(
              relation.users.map(async user => {
                const member = await userIdToGuildMember(user.id);
                if (!member) {
                  throw new Error(`Failed to fetch user: ${user.id}`);
                }

                return member;
              }),
            );

            const usersJoined = coViewers.map(member => `<@${member.id}>`).join(' と ');
            return new EmbedBuilder()
              .setTitle('複数人が視聴していた動画があります！')
              .setDescription(
                `${usersJoined} はこの動画を視聴していました\n[${relation.video.title}](https://www.youtube.com/watch?v=${relation.video.id})`,
              )
              .setImage(`${relation.video.thumbnailUrl}`)
              .setFooter({ text: 'Videos viewed by multiple users' })
              .setTimestamp()
              .setColor(0xc37d9b);
          }),
        )
      : [
          new EmbedBuilder()
            .setTitle('複数人が視聴していた動画はありませんでした')
            .setFooter({ text: 'Videos viewed by multiple users' })
            .setTimestamp()
            .setColor(0xc37d9b),
        ];

  await reply(embeds);
};
