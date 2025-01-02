import { Hono } from "hono";

import { fetchData } from "../utils/db.js";

const app = new Hono();

app.get("/", async (c) => {
  const { data: teams, error } = await fetchData("SELECT * FROM teams");

  if (error) {
    return c.json({ error }, 500);
  }

  return c.json({ teams });
});

app.get("/:id", async (c) => {
  const teamId = c.req.param("id");
  const { data: team, error } = await fetchData(
    "SELECT * FROM teams WHERE id = ?",
    [teamId]
  );

  if (error) {
    return c.json({ error }, 500);
  }

  if (!team || team.length === 0) {
    return c.json({ error: "Team not found" }, 404);
  }

  return c.json({ team: team[0] });
});

export default app;
