import { Hono } from "hono";

import { fetchData } from "../utils/db.js";

const app = new Hono();

app.get("/", async (c) => {
  const { data: ratings, error } = await fetchData("SELECT * FROM ratings");

  if (error) {
    return c.json({ error }, 500);
  }

  return c.json({ ratings });
});

app.get("/race/:id", async (c) => {
  const raceId = c.req.param("id");
  const { data: ratings, error } = await fetchData(
    "SELECT * FROM ratings WHERE race_id = ?",
    [raceId]
  );

  if (error) {
    return c.json({ error }, 500);
  }

  if (!ratings || ratings.length === 0) {
    return c.json({ error: "Race ratings not found" }, 404);
  }

  return c.json({ ratings });
});

app.get("/rater/:raterId/race/:raceId", async (c) => {
  const { raterId, raceId } = c.req.param();
  const { data: ratings, error } = await fetchData(
    "SELECT * FROM ratings WHERE rater_id = ? AND race_id = ?",
    [raterId, raceId]
  );

  if (error) {
    return c.json({ error }, 500);
  }

  if (!ratings || ratings.length === 0) {
    return c.json({ error: "Rater race rating not found" }, 404);
  }

  return c.json({ ratings });
});

export default app;
