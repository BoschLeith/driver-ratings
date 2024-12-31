-- Step 1: Create a new drivers table without the team_id column
CREATE TABLE new_drivers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Step 2: Copy data from the old drivers table to the new table
INSERT INTO new_drivers (id, name, created_at, updated_at)
SELECT id, name, created_at, updated_at FROM drivers;

-- Step 3: Drop the old drivers table
DROP TABLE drivers;

-- Step 4: Rename the new table to drivers
ALTER TABLE new_drivers RENAME TO drivers;

-- Step 5: Create the driver_team table
CREATE TABLE driver_team (
    driver_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL,
    season INTEGER NOT NULL,
    PRIMARY KEY (driver_id, team_id, season),
    FOREIGN KEY (driver_id) REFERENCES drivers (id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams (id) ON DELETE CASCADE
);
