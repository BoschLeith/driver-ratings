import { Hono } from "hono";
import { fetchData } from "../utils/db.js";

const app = new Hono();

app.get("/", async (c) => {
  const { data: races, error } = await fetchData("SELECT * FROM races");

  if (error) {
    return c.json({ error }, 500);
  }

  return c.json({ races });
});

app.get("/:id", async (c) => {
  const raceId = c.req.param("id");
  const { data: race, error } = await fetchData(
    "SELECT * FROM races WHERE id = ?",
    [raceId]
  );

  if (error) {
    return c.json({ error }, 500);
  }

  if (!race || race.length === 0) {
    return c.json({ error: "Race not found" }, 404);
  }

  return c.json({ race: race[0] });
});

app.post("/", async (c) => {
  const { name, date } = await c.req.json();

  const { error } = await fetchData(
    "INSERT INTO races (name, date) VALUES (?, ?)",
    [name, date]
  );

  if (error) {
    return c.json({ error }, 500);
  }

  return c.json({ message: "Race created successfully" }, 201);
});

app.put("/:id", async (c) => {
  const raceId = c.req.param("id");
  const { name, date } = await c.req.json();

  const updates = [];
  const params = [];

  if (name) {
    updates.push("name = ?");
    params.push(name);
  }

  if (date) {
    updates.push("date = ?");
    params.push(date);
  }

  if (updates.length === 0) {
    return c.json({ error: "No fields to update" }, 400);
  }

  updates.push("updated_at = CURRENT_TIMESTAMP");

  params.push(raceId);

  const query = `UPDATE races SET ${updates.join(", ")} WHERE id = ?`;

  const { error } = await fetchData(query, params);

  if (error) {
    return c.json({ error }, 500);
  }

  return c.json({ message: "Race updated successfully" });
});

export default app;
