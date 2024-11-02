import { cors } from '@elysiajs/cors';
import type { User, Video } from '@ikihaji-tube/core/model';
import { Elysia, type TSchema, t } from 'elysia';

const users: User[] = [];

export const app = new Elysia({
  prefix: '/api',
})
  .use(
    cors({
      origin: '*',
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  )
  .get('/', () => 'Hello, world!')
  .get('/users', () => {
    // biome-ignore lint/suspicious/noConsoleLog:
    console.log('[/users]', users);

    return users;
  })
  .get('/users/:id', ({ params }) => {
    const userid = params.id;
    // biome-ignore lint/suspicious/noConsoleLog:
    console.log('[/users/:id]', userid);

    const user = users.find(user => user.id === userid);
    if (!user) {
      return null;
    }

    // biome-ignore lint/suspicious/noConsoleLog:
    console.log('[/users/:id]', user);

    return user;
  })
  .post(
    '/users/:id/viewing-history',
    ({ body, params }) => {
      // biome-ignore lint/suspicious/noConsoleLog:
      console.log('[/users/:id/viewing-history]', body, params);

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

      // biome-ignore lint/suspicious/noConsoleLog:
      console.log('[/users/:id/viewing-history]', user.viewingHistory);

      return { status: 200, body: user.viewingHistory };
    },
    {
      body: t.Array(
        t.Object({
          id: t.String(),
          title: t.String(),
          thumbnailUrl: t.String({ format: 'uri' }),
        } satisfies Record<keyof Video, TSchema>),
      ),
    },
  )
  .listen(process.env['PORT'] || 4000);

// biome-ignore lint/suspicious/noConsoleLog: This log is necessary to verify that the server is running properly.
console.log(`📺 IkihajiTube API is running at ${app.server?.hostname}:${app.server?.port}`);
