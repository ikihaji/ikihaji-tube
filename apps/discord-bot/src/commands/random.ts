import { type Client, type CommandInteraction, EmbedBuilder } from 'discord.js';
import type { User } from '../types/global';
import { convertThumbnailToVideoUrl } from '../utils/convertThumbnailToVideoUrl';
import { fetchUsers } from '../utils/fetchUsers';
import { getUsernameFromId } from '../utils/getUsernameFromId';

export const handleRandomCommand = async (interaction: CommandInteraction, client: Client) => {
  let users: User[] = [];

  // ユーザー情報を取得
  await fetchUsers()
    .then(fetchedUsers => {
      users = fetchedUsers;
    })
    .catch(error => {
      console.error('Error fetching users:', error);
    });

  // Embedのフィールドを作成するための配列
  const fields: { name: string; value: string; inline: boolean }[] = [];

  // ユーザーの視聴履歴を集計
  for (const user of users) {
    const randomVideoIndex = Math.floor(Math.random() * user.viewingHistory.length);
    const randomVideo = user.viewingHistory[randomVideoIndex];

    if (randomVideo) {
      const videoUrl = convertThumbnailToVideoUrl(randomVideo.thumbnailUrl);
      const username = await getUsernameFromId(client, user.id);

      // Embedのフィールドを追加
      fields.push({
        name: `***${username}***`,
        value: `${videoUrl}\n ![thumbnail](${randomVideo.thumbnailUrl})`,
        inline: true,
      });
    }
  }

  const embed = new EmbedBuilder()
    .setAuthor({
      name: 'ikihajiTube Bot',
      iconURL: 'https://avatars.githubusercontent.com/u/186720720?s=400&u=59d5fb41b9a077ef1a5180e304b5f33cdcc68bcf&v=4',
    })
    .setTitle('Random commands')
    // .setDescription('その人が視聴してた動画がランダムに表示されます')
    .addFields(fields)
    // .setImage('https://avatars.githubusercontent.com/u/186720720?s=400&u=59d5fb41b9a077ef1a5180e304b5f33cdcc68bcf&v=4')
    .setFooter({
      text: 'ikihajiTube',
      iconURL: 'https://avatars.githubusercontent.com/u/186720720?s=400&u=59d5fb41b9a077ef1a5180e304b5f33cdcc68bcf&v=4',
    })
    .setTimestamp()
    .setColor(0xff0000);
  // .setThumbnail(
  //   'https://avatars.githubusercontent.com/u/186720720?s=400&u=59d5fb41b9a077ef1a5180e304b5f33cdcc68bcf&v=4',
  // );

  await interaction.reply({ embeds: [embed] });
};
