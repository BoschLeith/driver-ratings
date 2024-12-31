import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { turso } from './turso.js';

const app = new Hono();

app.use(logger());

app.get('/teams', async (c) => {
  try {
    const { rows } = await turso.execute("SELECT * FROM teams");
    return c.json({ teams: rows });
  } catch (error) {
    console.error('Error fetching teams:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

app.get('/teams/:id', async (c) => {
  const teamId = c.req.param('id');

  try {
    const { rows } = await turso.execute({
      sql: "SELECT * FROM teams WHERE id = ?",
      args: [teamId],
    });

    if (rows.length === 0) {
      return c.json({ error: 'Team not found' }, 404);
    }

    return c.json({ team: rows[0] });
  } catch (error) {
    console.error('Error fetching team:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

const port = 3000;

serve({
  fetch: app.fetch,
  port
});

console.log(`Server is running on http://localhost:${port}`);
