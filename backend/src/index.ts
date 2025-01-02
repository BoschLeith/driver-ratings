import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";

import drivers from "./routes/drivers.js";
import races from "./routes/races.js";
import raters from "./routes/raters.js";
import ratings from "./routes/ratings.js";
import teams from "./routes/teams.js";

const app = new Hono();

app.use(logger());

app.route("/", drivers);
app.route("/races", races);
app.route("/raters", raters);
app.route("ratings", ratings);
app.route("/teams", teams);

const port = 3000;

serve({
  fetch: app.fetch,
  port,
});

console.log(`Server is running on http://localhost:${port}`);
