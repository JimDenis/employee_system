--DROP DATABASE IF EXISTS org_layoutDB;

--CREATE DATABASE org_layoutDB;

USE org_layoutDB;

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMINAL (9,2) NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO roles (title, salary, department_id)
VALUES ("VP", 200000.00, 10);

INSERT INTO roles (title, salary, department_id)
VALUES ("SR VP", 250000.00, 10);

INSERT INTO roles (title, salary, department_id)
VALUES ("programmer", 100000.00, 20);

INSERT INTO roles (title, salary, department_id)
VALUES ("SR programmer", 120000.00, 20);

INSERT INTO roles (title, salary, department_id)
VALUES ("tester", 50000.00, 30);

INSERT INTO roles (title, salary, department_id)
VALUES ("SR tester", 75000.00, 30);

INSERT INTO roles (title, salary, department_id)
VALUES ("sales", 25000.00, 40);

INSERT INTO roles (title, salary, department_id)
VALUES ("SR sales", 40000.00, 40);


-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);