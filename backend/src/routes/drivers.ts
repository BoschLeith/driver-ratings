import { Hono } from "hono";

import { fetchData } from "../utils/db.js";

const app = new Hono();

app.get("/drivers/teams", async (c) => {
  const { data: drivers, error } = await fetchData(`
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

  if (error) {
    return c.json({ error }, 500);
  }

  return c.json({ drivers });
});

app.get("/drivers", async (c) => {
  const { data: drivers, error } = await fetchData("SELECT * FROM drivers");

  if (error) {
    return c.json({ error }, 500);
  }

  return c.json({ drivers });
});

app.get("/drivers/:id", async (c) => {
  const driverId = c.req.param("id");
  const { data: driver, error } = await fetchData(
    "SELECT * FROM drivers WHERE id = ?",
    [driverId]
  );

  if (error) {
    return c.json({ error }, 500);
  }

  if (!driver || driver.length === 0) {
    return c.json({ error: "Driver not found" }, 404);
  }

  return c.json({ driver: driver[0] });
});

export default app;
