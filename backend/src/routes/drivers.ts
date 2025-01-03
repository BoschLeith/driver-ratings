import { Hono } from "hono";

import { fetchData } from "../utils/db.js";

const app = new Hono();

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

app.post("/drivers", async (c) => {
  const { name } = await c.req.json();

  const { error } = await fetchData("INSERT INTO drivers (name) VALUES (?)", [
    name,
  ]);

  if (error) {
    return c.json({ error }, 500);
  }

  return c.json({ message: "Driver created successfully" }, 201);
});

app.put("/drivers/:id", async (c) => {
  const driverId = c.req.param("id");
  const { name } = await c.req.json();

  const { error } = await fetchData(
    "UPDATE drivers SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    [name, driverId]
  );

  if (error) {
    return c.json({ error }, 500);
  }

  return c.json({ message: "Driver updated successfully" });
});

app.delete("/drivers/:id", async (c) => {
  const driverId = c.req.param("id");

  const { error } = await fetchData("DELETE FROM drivers WHERE id = ?", [
    driverId,
  ]);

  if (error) {
    return c.json({ error }, 500);
  }

  return c.json({ message: "Driver deleted successfully" });
});

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

export default app;
