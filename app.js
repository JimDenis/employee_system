var mysql = require("mysql");
const inquirer = require("inquirer");
//const Manager = require("./lib/Manager");
//const Engineer = require("./lib/Engineer");
//const Intern = require("./lib/Intern");

const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
//const render = require("./lib/htmlRenderer");
var employeeArray = [];

const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

//const Employee = require("./lib/Employee");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "org_layoutDB"
});

function askWhatTask() {
  inquirer
    .prompt([
      {
        type: "checkbox",
        name: "whatTask",
        message: "What would you like to do",
        choices: [
          "View Employees",
          "View Departments",
          "View Roles",
          "Add Employees",
          "Add Departments",
          "Add Roles",
          "Update Employees",
          "Update Departments",
          "Update Roles",
          "Exit"
        ]
      }
    ])
    .then(answers => {
      console.info("Answer:", answers.whatTask[0]);
      if (answers.whatTask[0] === "View Employees") {
        selectAllEmployees();
      } else if (answers.whatTask[0] === "View Roles") {
        selectAllRoles();
      } else if (answers.whatTask[0] === "View Departments") {
        selectAllDepartments();
      }else if (answers.whatTask[0] === "Add Employees") {
        addEmployees();
      } else if (answers.whatTask[0] === "Add Departments") {
        addDepartments();
      } else if (answers.whatTask[0] === "Add Roles") {
        addRoles();
      } else if (answers.whatTask[0] === "Update Employees") {
        UpdateEmployees();
      } else if (answers.whatTask[0] === "Update Roles") {
        UpdateRoles();
      } else if (answers.whatTask[0] === "Update Departments") {
        UpdateDepartments();
      } else {
        console.log("That is coming soon");
      }
    });
}

function selectAllEmployees() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM employees", function(err, results) {
    if (err) throw err;
    console.table(results);
    connection.end();
    // once you have the items, prompt the user for which they'd like to bid on
  });
}

function selectAllRoles() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM roles", function(err, results) {
    if (err) throw err;
    console.table(results);
    connection.end();
    // once you have the items, prompt the user for which they'd like to bid on
  });
}

function selectAllDepartments() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM departments", function(err, results) {
    if (err) throw err;
    console.table(results);
    connection.end();
    // once you have the items, prompt the user for which they'd like to bid on
  });
}

function addDepartments() {
  inquirer
    .prompt([
      {
        name: "deptName",
        message: "What is the name of the department?"
      }
    ])
    .then(answers => {
      console.info("Answer:", answers.deptName);
      connection.query(
        "INSERT INTO departments SET ?",
        {
          name: answers.deptName
        },
        function(err) {
          if (err) throw err;
          console.log("The department was added successfully!");
          connection.end();
          // re-prompt the user for if they want to bid or post
          //start();
          //  createEmployee(answerRole, answerVar, answers.name, answers.ID, answers.email);
        }
      );
      //  createEmployee(answerRole, answerVar, answers.name, answers.ID, answers.email);
    });
}

function addRoles() {
  inquirer
    .prompt([
      {
        name: "roleTitle",
        message: "What is the title of the role?"
      },
      {
        name: "roleSalary",
        message: "What is the salary of the role?"
      },
      {
        name: "roleDeptID",
        message: "What is the department ID of the role?"
      }
    ])
    .then(answers => {
      console.info(
        "Answer:",
        answers.roleTitle,
        answers.roleSalary,
        answers.roleDeptID
      );
      connection.query(
        "INSERT INTO roles SET ?",
        {
          title: answers.roleTitle,
          salary: answers.roleSalary,
          department_id: answers.roleDeptID
        },
        function(err) {
          if (err) throw err;
          console.log("The role was added successfully!");
          connection.end();
      //  createEmployee(answerRole, answerVar, answers.name, answers.ID, answers.email);
    }
    );
    //  createEmployee(answerRole, answerVar, answers.name, answers.ID, answers.email);
  });
}

function addEmployees() {
  inquirer
    .prompt([
      {
        name: "firstName",
        message: "What is the employees first name?"
      },
      {
        name: "lastName",
        message: "What is the employees last name?"
      },
      {
        name: "roleID",
        message: "What is the employees role ID?"
      },
      {
        name: "managerID",
        message: "What is the employees managers ID?"
      }
    ])
    .then(answers => {
      console.info(
        "Answer:",
        answers.firstName,
        answers.lastName,
        answers.roleID,
        answers.managerID
      );
      connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          roll_ID: answers.roleID,
          manager_id: answers.managerID
        },
        function(err) {
          if (err) throw err;
          console.log("The employee was added successfully!");
          connection.end();
          // re-prompt the user for if they want to bid or post
          //start();
          //  createEmployee(answerRole, answerVar, answers.name, answers.ID, answers.email);
        }
      );
    });
}

function UpdateEmployees() {
  connection.query("SELECT * FROM employees", function(err, results) {
    if (err) throw err;
    console.table(results);
    // once you have the items, prompt the user for which they'd like to bid on

    inquirer
      .prompt([
        {
          name: "whichEmployee",
          message: "Which employee would you like to update? Enter their ID."
        }
      ])
      .then(answers => {
        console.info("Answer:", answers.whichEmployee);
        connection.query(
          "SELECT * FROM employees WHERE ?",
          {
            ID: answers.whichEmployee
          },
          function(err, results) {
            if (err) throw err;
            console.table(results);
            //connection.end();
            finishUpdateEmployees(answers.whichEmployee);
            //console.log("The employee was added successfully!");
            //connection.end();
            //  askRest("Manager", answers.officeNumber)
          }
        );
      });
  });
}

function finishUpdateEmployees(ID) {
  inquirer
    .prompt([
      {
        type: "checkbox",
        name: "whatColumn",
        message: "Which column would you like to update",
        choices: ["first_name", "last_name", "roll_ID", "manager_id"]
      },
      {
        name: "whatValue",
        message: "What should the new value be?"
      }
    ])
    .then(answers => {
      console.info("Answer:", answers.whatColumn[0], answers.whatValue, ID);
      var colName = answers.whatColumn;
      var tableName = "employees"
      console.log(colName);
      connection.query(
        "UPDATE employees SET ? WHERE ?",
        [
          {
            [colName]: answers.whatValue
          },
          {
            ID: ID
          }
        ],
        function(err) {
          if (err) throw err;
          console.log("The employee was updated successfully!");
          connection.end();
        }
      );
    });
}

function UpdateRoles() {
  connection.query("SELECT * FROM roles", function(err, results) {
    if (err) throw err;
    console.table(results);
    // once you have the items, prompt the user for which they'd like to bid on

    inquirer
      .prompt([
        {
          name: "whichRole",
          message: "Which role would you like to update? Enter the ID."
        }
      ])
      .then(answers => {
        console.info("Answer:", answers.whichRole);
        connection.query(
          "SELECT * FROM roles WHERE ?",
          {
            ID: answers.whichRole
          },
          function(err, results) {
            if (err) throw err;
            console.table(results);
            //connection.end();
            finishUpdateRoles(answers.whichRole);
            //console.log("The employee was added successfully!");
            //connection.end();
            //  askRest("Manager", answers.officeNumber)
          }
        );
      });
  });
}

function finishUpdateRoles(ID) {
  inquirer
    .prompt([
      {
        type: "checkbox",
        name: "whatColumn",
        message: "Which column would you like to update",
        choices: ["title", "salary", "deaprtment_id"]
      },
      {
        name: "whatValue",
        message: "What should the new value be?"
      }
    ])
    .then(answers => {
      console.info("Answer:", answers.whatColumn[0], answers.whatValue, ID);
      var colName = answers.whatColumn;
      var tableName = "employees"
      console.log(colName);
      connection.query(
        "UPDATE roles SET ? WHERE ?",
        [
          {
            [colName]: answers.whatValue
          },
          {
            ID: ID
          }
        ],
        function(err) {
          if (err) throw err;
          console.log("The role was updated successfully!");
          connection.end();
        }
      );
    });
}

function UpdateDepartments() {
  connection.query("SELECT * FROM departments", function(err, results) {
    if (err) throw err;
    console.table(results);
    // once you have the items, prompt the user for which they'd like to bid on

    inquirer
      .prompt([
        {
          name: "whichDepartment",
          message: "Which department would you like to update? Enter the ID."
        }
      ])
      .then(answers => {
        console.info("Answer:", answers.whichRole);
        connection.query(
          "SELECT * FROM departments WHERE ?",
          {
            ID: answers.whichDepartment
          },
          function(err, results) {
            if (err) throw err;
            console.table(results);
            //connection.end();
            finishUpdateDepartments(answers.whichDepartment);
            //console.log("The employee was added successfully!");
            //connection.end();
            //  askRest("Manager", answers.officeNumber)
          }
        );
      });
  });
}

function finishUpdateDepartments(ID) {
  inquirer
    .prompt([
     {
        name: "whatValue",
        message: "What should the new name be?"
      }
    ])
    .then(answers => {
      console.info("Answer:", answers.whatValue, ID);
      var colName = answers.whatColumn;
      var tableName = "employees"
      console.log(colName);
      connection.query(
        "UPDATE departments SET ? WHERE ?",
        [
          {
            name: answers.whatValue
          },
          {
            ID: ID
          }
        ],
        function(err) {
          if (err) throw err;
          console.log("The department was updated successfully!");
         // connection.end();
          askWhatTask();
        }
      );
    });
}

askWhatTask();

////console.log (Jim = new Engineer("Jim",1,"jim@company.com","JimDenis"))
////console.log (Judy = new Intern("Judy",2,"judy@company.com","UofA"))
////console.log(Mike = new Manager("Mike",3,"mike@company.com","A4127"));
//console.log(Jim.getRole());
//console.log(Judy.getRole());
//console.log(Mike.getRole());
//console.log(Jim.getId());
//console.log(Jim.getRole(),Jim.name,Jim.id,Jim.email,Jim.getgitHub())
//console.log("in 1")
////employeeArray.push(Jim);
////employeeArray.push(Judy)
////employeeArray.push(Mike)
//console.log(employeeArray);
//console.log(Jim.getRole());
//console.log(engineer.gitRole())
////console.log(bob = render(employeeArray))
//render(Jim.name,Jim.id,Jim.email)

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
