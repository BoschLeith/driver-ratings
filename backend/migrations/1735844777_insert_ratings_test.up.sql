-- Write your up sql migration here

INSERT INTO ratings (driver_id, race_id, rater_id, rating) 
VALUES 
    (1, 1, 3, 10),
    (1, 1, 2, 10),
    (1, 1, 1, 10);
