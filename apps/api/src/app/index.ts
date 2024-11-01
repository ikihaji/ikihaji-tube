import { Elysia } from 'elysia';

export const app = new Elysia().get('/', () => 'Hello, world!').listen(process.env['PORT'] || 4000);

// biome-ignore lint/suspicious/noConsoleLog: This log is necessary to verify that the server is running properly.
console.log(`📺 IkihajiTube API is running at ${app.server?.hostname}:${app.server?.port}`);
