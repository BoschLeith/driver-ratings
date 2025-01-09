import { Request, Response, Router } from "express";

import { turso } from "../turso";
import getJSON from "../utils/getJSON";

interface Team {
  id: number;
  name: string;
  full_name: string;
}

interface Driver {
  id: number;
  name: string;
  teams: Team[];
}

interface DriverTeamRow {
  driver_id: number;
  driver_name: string;
  team_id: number;
  team_name: string;
  team_full_name: string;
}

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

// // Get all drivers and their teams for a specific season
// router.get("/teams/:season", async (req: Request, res: Response) => {
//   const season = parseInt(req.params.season, 10);

//   if (isNaN(season)) {
//     res.status(400).send({ error: "Invalid season parameter" });
//     return;
//   }

//   try {
//     const data = await turso.execute({
//       sql: `
//         SELECT d.id AS driver_id, d.name AS driver_name, t.id AS team_id, t.name AS team_name, t.full_name AS team_full_name
//         FROM drivers d
//         LEFT JOIN driver_team dt ON d.id = dt.driver_id
//         LEFT JOIN teams t ON dt.team_id = t.id
//         WHERE dt.season = @season
//       `,
//       args: { season },
//     });

//     const driversWithTeams = data.rows;

//     if (!driversWithTeams || driversWithTeams.length === 0) {
//       res.status(404).send({ error: "No drivers found for this season" });
//       return;
//     }

//     res.send(driversWithTeams);
//   } catch (error) {
//     console.error("Error fetching drivers with teams for season:", error);
//     res.status(500).send({
//       error: "Failed to fetch drivers with teams for the specified season",
//     });
//   }
// });

// Get a driver and their teams for a specific season
router.get("/:id/teams/:season", async (req: Request, res: Response) => {
  const driverId = req.params.id;
  const season = parseInt(req.params.season, 10);

  if (isNaN(season)) {
    res.status(400).send({ error: "Invalid season parameter" });
    return;
  }

  try {
    const data = await turso.execute({
      sql: `
        SELECT d.*, t.name AS team_name, t.full_name AS team_full_name
        FROM drivers d
        LEFT JOIN driver_team dt ON d.id = dt.driver_id
        LEFT JOIN teams t ON dt.team_id = t.id
        WHERE d.id = @driverId AND dt.season = @season
      `,
      args: { driverId, season },
    });

    const driver = data.rows[0];

    if (!driver) {
      res
        .status(404)
        .send({ error: "Driver not found or no teams for this season" });
      return;
    }

    res.send(driver);
  } catch (error) {
    console.error("Error fetching driver with teams:", error);
    res.status(500).send({ error: "Failed to fetch driver with teams" });
  }
});

// Get all drivers and their teams for a specific season
router.get("/teams/:season", async (req: Request, res: Response) => {
  const season = parseInt(req.params.season, 10);

  if (isNaN(season)) {
    res.status(400).send({ error: "Invalid season parameter" });
    return;
  }

  try {
    const data = await turso.execute({
      sql: `
        SELECT d.id AS driver_id, d.name AS driver_name, t.id AS team_id, t.name AS team_name, t.full_name AS team_full_name
        FROM drivers d
        LEFT JOIN driver_team dt ON d.id = dt.driver_id
        LEFT JOIN teams t ON dt.team_id = t.id
        WHERE dt.season = @season
      `,
      args: { season },
    });

    const driversWithTeams = getJSON(data) as DriverTeamRow[];

    if (!driversWithTeams || driversWithTeams.length === 0) {
      res.status(404).send({ error: "No drivers found for this season" });
      return;
    }

    const result: Driver[] = [];

    driversWithTeams.forEach((row: DriverTeamRow) => {
      const { driver_id, driver_name, team_id, team_name, team_full_name } =
        row;

      let driver = result.find((d) => d.id === driver_id);

      if (!driver) {
        driver = {
          id: driver_id,
          name: driver_name,
          teams: [],
        };
        result.push(driver);
      }

      if (team_id) {
        driver.teams.push({
          id: team_id,
          name: team_name,
          full_name: team_full_name,
        });
      }
    });

    res.send(result);
  } catch (error) {
    console.error("Error fetching drivers with teams for season:", error);
    res.status(500).send({
      error: "Failed to fetch drivers with teams for the specified season",
    });
  }
});

export default router;
