import { treaty } from '@elysiajs/eden';
import type { App } from '@ikihaji-tube/api';
import type { Video } from '@ikihaji-tube/core/model';
import { getBaseUrl } from '@ikihaji-tube/core/util';
import { match } from 'ts-pattern';

chrome.runtime.onMessage.addListener(message => {
  const client = treaty<App>(getBaseUrl({ app: 'api' }).toString());

  match(message.action)
    .with('push-video-to-viewing-history', async () => {
      const video: Video = message.data;
      // biome-ignore lint/suspicious/noConsoleLog:
      console.log('push-video-to-viewing-history:', video);

      const res = await client.api
        .users({
          id: '699659576349294633',
        })
        ['viewing-history'].post([video]);

      // biome-ignore lint/suspicious/noConsoleLog:
      console.log('updated viewing history:', res.data?.body);
    })
    .otherwise(() => {});
});
