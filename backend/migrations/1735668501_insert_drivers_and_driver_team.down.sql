-- Write your down sql migration here

-- Step 1: Delete entries from the driver_team table
DELETE FROM driver_team WHERE driver_id IN (
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24
);

-- Step 2: Delete entries from the drivers table
DELETE FROM drivers WHERE name IN (
    'Max Verstappen',
    'Sergio Pérez',
    'Lewis Hamilton',
    'George Russell',
    'Charles Leclerc',
    'Carlos Sainz',
    'Lando Norris',
    'Oscar Piastri',
    'Esteban Ocon',
    'Pierre Gasly',
    'Yuki Tsunoda',
    'Daniel Ricciardo',
    'Fernando Alonso',
    'Lance Stroll',
    'Alex Albon',
    'Logan Sargeant',
    'Valtteri Bottas',
    'Zhou Guanyu',
    'Kevin Magnussen',
    'Nico Hülkenberg',
    'Oliver Bearman',
    'Franco Colapinto',
    'Liam Lawson',
    'Jack Doohan'
);

