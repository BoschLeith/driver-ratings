import express, { Request, Response } from "express";

import { turso } from "./turso";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.send({ message: "Hello, TypeScript with Express!" });
});

app.get("/api/drivers", async (req: Request, res: Response) => {
  try {
    const data = await turso.execute("SELECT * FROM drivers");
    const drivers = data.rows;

    if (!drivers || drivers.length === 0) {
      res.status(404).send({ error: "No drivers found" });
      return;
    }

    res.send(drivers);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).send({ error: "Failed to fetch drivers" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
