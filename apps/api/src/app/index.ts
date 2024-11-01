import type { User, Video } from '@ikihaji-tube/core/model';
import { Elysia, type TSchema, t } from 'elysia';

const users: User[] = [];

export const app = new Elysia({
  prefix: '/api',
})
  .get('/', () => 'Hello, world!')
  .post(
    '/users/:id/viewing-history',
    ({ body, params }) => {
      const user = users.find(user => user.id === params.id);

      if (!user) {
        const newUser: User = {
          id: params.id,
          viewingHistory: body,
        };
        users.push(newUser);

        return { status: 201, body: newUser.viewingHistory };
      }

      user.viewingHistory.push(...body);

      return { status: 200, body: user.viewingHistory };
    },
    {
      body: t.Array(
        t.Object({
          id: t.String(),
          title: t.String(),
          channel: t.String(),
          thumnailUrl: t.String({ format: 'uri' }),
        } satisfies Record<keyof Video, TSchema>),
      ),
    },
  )
  .listen(process.env['PORT'] || 4000);

// biome-ignore lint/suspicious/noConsoleLog: This log is necessary to verify that the server is running properly.
console.log(`📺 IkihajiTube API is running at ${app.server?.hostname}:${app.server?.port}`);
