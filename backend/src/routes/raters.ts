import { Hono } from "hono";

import { fetchData } from "../utils/db.js";

const app = new Hono();

app.get("/", async (c) => {
  const { data: raters, error } = await fetchData("SELECT * FROM raters");

  if (error) {
    return c.json({ error }, 500);
  }

  return c.json({ raters });
});

app.get("/:id", async (c) => {
  const raterId = c.req.param("id");
  const { data: rater, error } = await fetchData(
    "SELECT * FROM raters WHERE id = ?",
    [raterId]
  );

  if (error) {
    return c.json({ error }, 500);
  }

  if (!rater || rater.length === 0) {
    return c.json({ error: "Rater not found" }, 404);
  }

  return c.json({ rater: rater[0] });
});

export default app;
