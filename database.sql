-- create the table
CREATE TABLE task_table (
    user_id serial PRIMARY KEY,
    task text,
    complete boolean DEFAULT 'false'
);

-- insert some example tasks
INSERT INTO task_table (task)
VALUES ('wash dishes'),
('vacuum carpet'),
('get a dog'),
('achieve enlightenment');

-- view the table
SELECT * FROM task_table;
