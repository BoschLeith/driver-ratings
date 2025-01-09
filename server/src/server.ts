import express from "express";

import drivers from "./routes/drivers";
import teams from "./routes/teams";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/drivers", drivers);
app.use("/api/teams", teams);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
