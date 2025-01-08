import { Router, Request, Response } from "express";

import { turso } from "../turso";

const router = Router();

// Get all drivers
router.get("/", async (req: Request, res: Response) => {
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

// Get a driver by ID
router.get("/:id", async (req: Request, res: Response) => {
  const driverId = req.params.id;

  try {
    const data = await turso.execute({
      sql: "SELECT * FROM drivers WHERE id = @driverId",
      args: { driverId },
    });
    const driver = data.rows[0];

    if (!driver) {
      res.status(404).send({ error: "Driver not found" });
      return;
    }

    res.send(driver);
  } catch (error) {
    console.error("Error fetching driver:", error);
    res.status(500).send({ error: "Failed to fetch driver" });
  }
});

// Create a new driver
router.post("/", async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send({ error: "Name is required" });
    return;
  }

  try {
    const data = await turso.execute({
      sql: "INSERT INTO drivers (name) VALUES (@name)",
      args: { name },
    });

    res.status(201).send({
      message: "Driver created successfully",
      driverId: data.lastInsertRowid,
    });
  } catch (error) {
    console.error("Error creating driver:", error);
    res.status(500).send({ error: "Failed to create driver" });
  }
});

// Update an existing driver
router.put("/:id", async (req: Request, res: Response) => {
  const driverId = req.params.id;
  const { name } = req.body;

  if (!name) {
    res.status(400).send({ error: "Name is required to update" });
    return;
  }

  try {
    const data = await turso.execute({
      sql: "UPDATE drivers SET name = @name, updated_at = CURRENT_TIMESTAMP WHERE id = @driverId",
      args: { name, driverId },
    });

    if (data.rowsAffected === 0) {
      res.status(404).send({ error: "Driver not found" });
      return;
    }

    res.send({ message: "Driver updated successfully" });
  } catch (error) {
    console.error("Error updating driver:", error);
    res.status(500).send({ error: "Failed to update driver" });
  }
});

// Delete a driver
router.delete("/:id", async (req: Request, res: Response) => {
  const driverId = req.params.id;

  try {
    const data = await turso.execute({
      sql: "DELETE FROM drivers WHERE id = @driverId",
      args: { driverId },
    });

    if (data.rowsAffected === 0) {
      res.status(404).send({ error: "Driver not found" });
      return;
    }

    res.send({ message: "Driver deleted successfully" });
  } catch (error) {
    console.error("Error deleting driver:", error);
    res.status(500).send({ error: "Failed to delete driver" });
  }
});

export default router;
