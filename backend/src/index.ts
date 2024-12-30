import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { turso } from './turso.js';

const app = new Hono()

app.get('/', async (c) => {
  const { rows } = await turso.execute("SELECT * FROM teams");

  return c.json({ teams: rows });
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
