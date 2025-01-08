import express from "express";

import drivers from "./routes/drivers";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/drivers", drivers);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
