import type { Client } from 'discord.js';

export const getUsernameFromId = async (client: Client, userId: string): Promise<string> => {
  try {
    // ギルドのメンバー情報を取得
    const guild = client.guilds.fetch('1301971074900037762');
    if (!guild) {
      throw new Error('ギルドが見つかりません。');
    }

    const member = await (await guild).members.fetch(userId); // ユーザー情報を取得
    return member ? member.user.username : `ユーザーが見つかりません: ${userId}`;
  } catch (error) {
    console.error(`ユーザーID ${userId} の取得中にエラーが発生しました:`, error);
    return 'エラーが発生しました';
  }
};
