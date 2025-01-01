import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { turso } from "./turso.js";

const app = new Hono();

app.use(logger());

app.get("/teams", async (c) => {
  try {
    const { rows } = await turso.execute("SELECT * FROM teams");
    return c.json({ teams: rows });
  } catch (error) {
    console.error("Error fetching teams:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

app.get("/teams/:id", async (c) => {
  const teamId = c.req.param("id");

  try {
    const { rows } = await turso.execute({
      sql: "SELECT * FROM teams WHERE id = ?",
      args: [teamId],
    });

    if (rows.length === 0) {
      return c.json({ error: "Team not found" }, 404);
    }

    return c.json({ team: rows[0] });
  } catch (error) {
    console.error("Error fetching team:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

app.get("/drivers/teams", async (c) => {
  try {
    const { rows } = await turso.execute(`
      SELECT 
        d.id AS driver_id, 
        d.name AS driver_name, 
        t.id AS team_id, 
        t.name AS team_name, 
        t.full_name AS team_full_name
      FROM 
        drivers d
      LEFT JOIN 
        driver_team dt ON d.id = dt.driver_id
      LEFT JOIN 
        teams t ON dt.team_id = t.id
    `);

    const drivers = rows.map((row) => ({
      id: row.driver_id,
      name: row.driver_name,
      team: row.team_id
        ? {
            id: row.team_id,
            name: row.team_name,
            full_name: row.team_full_name,
          }
        : null,
    }));

    return c.json({ drivers });
  } catch (error) {
    console.error("Error fetching drivers with teams:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

app.get("/drivers", async (c) => {
  try {
    const { rows } = await turso.execute("SELECT * FROM drivers");
    return c.json({ drivers: rows });
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

app.get("/drivers/:id", async (c) => {
  const driverId = c.req.param("id");

  try {
    const { rows } = await turso.execute({
      sql: "SELECT * FROM drivers WHERE id = ?",
      args: [driverId],
    });

    if (rows.length === 0) {
      return c.json({ error: "Driver not found" }, 404);
    }

    return c.json({ driver: rows[0] });
  } catch (error) {
    console.error("Error fetching driver:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

app.get("/races", async (c) => {
  try {
    const { rows } = await turso.execute("SELECT * FROM races");
    return c.json({ races: rows });
  } catch (error) {
    console.error("Error fetching races:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

app.get("/races/:id", async (c) => {
  const raceId = c.req.param("id");

  try {
    const { rows } = await turso.execute({
      sql: "SELECT * FROM races WHERE id = ?",
      args: [raceId],
    });

    if (rows.length === 0) {
      return c.json({ error: "Race not found" }, 404);
    }

    return c.json({ race: rows[0] });
  } catch (error) {
    console.error("Error fetching race:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

const port = 3000;

serve({
  fetch: app.fetch,
  port,
});

console.log(`Server is running on http://localhost:${port}`);
