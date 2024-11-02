import type { Client } from 'discord.js';
// import { autoRandomCommand } from '#discord-bot/auto/autoRandom';
// import { autoRelationCommand } from '#discord-bot/auto/autoRelation';

// src/scheduler.ts
export function startCronJob(channelId: string, client: Client) {
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log('Daily job has started!');

  setInterval(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // 毎日0時00分00秒で実行する
    if (hours === 0 && minutes === 0 && seconds === 0) {
      executeTask(channelId, client);
    }
  }, 1000); // 1秒単位で確認する
}

// 実際の動作
function executeTask(channelId: string, client: Client) {
  // 定期実行される処理
  // autoRelationCommand(channelId, client);
  // autoRandomCommand(channelId, client);
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log('Job that execute in every 0 am has executed.', new Date());
}
