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

export default app;
