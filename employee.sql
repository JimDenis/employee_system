DROP DATABASE IF EXISTS org_layoutDB;

CREATE DATABASE org_layoutDB;

USE org_layoutDB;

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name  VARCHAR(30) NULL,
  roll_ID INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO employees (first_name, last_name, roll_ID, manager_id)
VALUES ("Sally", "Smith", 1, 100);

INSERT INTO employees (first_name, last_name, roll_ID, manager_id)
VALUES ("John", "Jones", 2, 110);

INSERT INTO employees (first_name, last_name, roll_ID, manager_id)
VALUES ("Jerry", "Jones", 3, 110);

-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);