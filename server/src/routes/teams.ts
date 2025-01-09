import { Router, Request, Response } from "express";

import { turso } from "../turso";

const router = Router();

// Get all teams
router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await turso.execute("SELECT * FROM teams");
    const teams = data.rows;

    if (!teams || teams.length === 0) {
      res.status(404).send({ error: "No teams found" });
      return;
    }

    res.send(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).send({ error: "Failed to fetch teams" });
  }
});

// Get a team by ID
router.get("/:id", async (req: Request, res: Response) => {
  const teamId = req.params.id;

  try {
    const data = await turso.execute({
      sql: "SELECT * FROM teams WHERE id = @teamId",
      args: { teamId },
    });
    const team = data.rows[0];

    if (!team) {
      res.status(404).send({ error: "Team not found" });
      return;
    }

    res.send(team);
  } catch (error) {
    console.error("Error fetching team:", error);
    res.status(500).send({ error: "Failed to fetch team" });
  }
});

// Create a new team
router.post("/", async (req: Request, res: Response) => {
  const { name, full_name } = req.body;

  if (!name || !full_name) {
    res.status(400).send({ error: "Name and full name are required" });
    return;
  }

  try {
    const data = await turso.execute({
      sql: "INSERT INTO teams (name, full_name) VALUES (@name, @full_name)",
      args: { name, full_name },
    });

    res.status(201).send({
      message: "Team created successfully",
      teamId: data.lastInsertRowid,
    });
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).send({ error: "Failed to create team" });
  }
});

// Update an existing team
router.put("/:id", async (req: Request, res: Response) => {
  const teamId = req.params.id;
  const { name, full_name } = req.body;

  const updates: string[] = [];
  const args: { [key: string]: any } = { teamId };

  if (name) {
    updates.push("name = @name");
    args.name = name;
  }

  if (full_name) {
    updates.push("full_name = @full_name");
    args.full_name = full_name;
  }

  if (updates.length === 0) {
    res.status(400).send({
      error: "At least one field (name or full name) is required to update",
    });
    return;
  }

  const sql = `UPDATE teams SET ${updates.join(
    ", "
  )}, updated_at = CURRENT_TIMESTAMP WHERE id = @teamId`;

  try {
    const data = await turso.execute({
      sql,
      args,
    });

    if (data.rowsAffected === 0) {
      res.status(404).send({ error: "Team not found" });
      return;
    }

    res.send({ message: "Team updated successfully" });
  } catch (error) {
    console.error("Error updating team:", error);
    res.status(500).send({ error: "Failed to update team" });
  }
});

// Delete a team
router.delete("/:id", async (req: Request, res: Response) => {
  const teamId = req.params.id;

  try {
    const data = await turso.execute({
      sql: "DELETE FROM teams WHERE id = @teamId",
      args: { teamId },
    });

    if (data.rowsAffected === 0) {
      res.status(404).send({ error: "Team not found" });
      return;
    }

    res.send({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Error deleting team:", error);
    res.status(500).send({ error: "Failed to delete team" });
  }
});

export default router;
