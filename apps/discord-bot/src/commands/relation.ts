import { type Client, type CommandInteraction, EmbedBuilder } from 'discord.js';
import type { User } from '#discord-bot/types/global';
import { convertThumbnailToVideoUrl } from '#discord-bot/utils/convertThumbnailToVideoUrl';
import { fetchUsers } from '#discord-bot/utils/fetchUsers';

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
export const handleRelationCommand = async (interaction: CommandInteraction, client: Client) => {
  let users: User[] = [];

  // ユーザー情報を取得
  await fetchUsers()
    .then(fetchedUsers => {
      users = fetchedUsers;
    })
    .catch(error => {
      console.error('Error fetching users:', error);
    });

  // 動画ごとに視聴しているユーザーを集計するオブジェクト
  const videoWatchers: Record<string, { users: string[]; url: string }> = {};

  // ユーザーの視聴履歴を集計
  for (const user of users) {
    for (const video of user.viewingHistory) {
      if (!videoWatchers[video.id]) {
        videoWatchers[video.id] = { users: [], url: convertThumbnailToVideoUrl(video.thumbnailUrl) };
      }

      // ユーザー名の取得
      const guild = interaction.guild; // 最初のギルド（サーバー）を取得
      let username = user.id; // デフォルトでユーザーIDを設定

      if (guild) {
        try {
          const member = await guild.members.fetch(user.id); // サーバーからユーザーを取得
          username = member ? member.user.username : user.id;
        } catch (error) {
          console.error(`Error fetching user ${user.id}:`, error);
        }
      }

      videoWatchers[video.id]?.users.push(username);
    }
  }

  // レスポンスメッセージの生成
  const responseMessages = Object.entries(videoWatchers)
    .map(([, data]) => {
      const userList = data.users; // ユーザーリストを取得
      if (userList.length <= 1) {
        return ''; // ユーザーが1人以下の場合は空文字を返す
      }
      const usersJoined = userList.join('と'); // ユーザーを「と」で繋げる
      return `${usersJoined}はこの動画を視聴しました。\n${data.url}`;
    })
    .filter(Boolean); // 空文字を除外する

  // メッセージをまとめて返信
  const responseMessage = responseMessages.join('\n\n');

  if (responseMessage) {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: 'ikihajiTube',
        iconURL:
          'https://avatars.githubusercontent.com/u/186720720?s=400&u=59d5fb41b9a077ef1a5180e304b5f33cdcc68bcf&v=4',
      })
      .setTitle('コラボプレイ')
      // .setDescription('Embedの説明')
      // .setThumbnail('サムネイルURL')
      // .addFields({ name: 'fieldのタイトル', value: 'fieldの内容' })
      // .setImage('画像URL')
      // .setFooter({ text: 'フッターに表示したい内容', iconURL: 'アイコンURL' })
      // .setTimestamp()
      .setColor('#FFFFFF');
    await interaction.reply({ embeds: [embed] });
  } else {
    await interaction.reply('同じ動画を視聴したユーザーがいません。');
  }
};
