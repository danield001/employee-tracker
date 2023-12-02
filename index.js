const inquirer = require('inquirer');


function promptUser() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "View All Employees",
                    "Add Employee",
                    "Update Employee Role",
                    "View All Roles",
                    "Add Role",
                    "View All Departments",
                    "Add Department",
                    "Exit"
                ],
                name: "action",
            }

        ])
        .then((answers) => {
            const nextAction = answers.action
            if (nextAction === "View All Employees") {
                viewEmployees();
            };

            if (nextAction === "Add Employee") {
                addEmployee();
            };

            if (nextAction === "Update Employee Role") {
                updateEmployee();
            };

            if (nextAction === "View All Roles") {
                viewRoles();
            };

            if (nextAction === "Add Role") {
                addRole();
            };

            if (nextAction === "View All Departments") {
                viewDepartments();
            };

            if (nextAction === "Add Department") {
                addDepartment();
            };

            if (nextAction === "Exit") {
                process.exit();
            };
        })
}