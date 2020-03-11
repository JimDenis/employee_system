--DROP DATABASE IF EXISTS org_layoutDB;

--CREATE DATABASE org_layoutDB;

USE org_layoutDB;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

INSERT INTO departments (name)
VALUES ("management");

INSERT INTO departments (name)
VALUES ("programming");

INSERT INTO departments (name)
VALUES ("QA");

INSERT INTO departments (name)
VALUES ("sales");

-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);