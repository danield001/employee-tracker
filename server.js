const inquirer = require('inquirer');
const db = require('./mysql');



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

// VIEW EMPLOYEE'S FUCNTION

const viewEmployees = () => {
    const sql = `SELECT * FROM employees`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err
        }
        console.log("\n");
        return promptUser();
    });
};

// ADD EMPLOYEE FUNCTION

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?"
        }
    ])
        .then(answer => {
            const params = [answer.firstName, answer.lastName]
            const sql = `SELECT * FROM roles`;
            db.query(sql, (err, rows) => {
                if (err) {
                    throw err;
                };
                const roles = rows.map(({ id, title }) => ({ value: id, name: title }));
                inquirer.prompt([
                    {
                        type: "list",
                        name: "role",
                        message: "What is the employee's role?",
                        choices: roles
                    }
                ])
                    .then(answer2 => {
                        const employeeRole = answer2.role.id;
                        params.push(employeeRole);

                        const sql = `INSERT INTO employees (first_name, last_name, role_id)
                    VALUES (?, ?, ?)`;
                        db.query(sql, params, (err) => {
                            if (err) {
                                throw err
                            }
                            console.log("Employee added to database!");
                            return promptUser();
                        });
                    });
            });
        });
};

// UPDATE EMPLOYEE FUNCTION
const updateEmployee = () => {
    const sql = `SELECT first_name, last_name, id FROM employees`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }

        const employees = rows.map(({ first_name, last_name, id }) => ({ name: `${first_name} ${last_name}`, value: id }));

        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee would you like to update?",
                choices: employees
            }
        ])
            .then(employeeAns => {
                const employee = employeeAns.employee;
                const params = [employee];

                const sqlRoles = `SELECT title, id FROM roles`;
                db.query(sqlRoles, (err, rows) => {
                    if (err) {
                        throw err;
                    }

                    const roles = rows.map(({ id, title }) => ({ value: id, name: title }));

                    inquirer.prompt([
                        {
                            type: "list",
                            name: "role",
                            message: "What is the employee's new role?",
                            choices: roles
                        }
                    ])
                        .then(rolesAns => {
                            const role = rolesAns.role;
                            params.unshift(role);

                            const sqlUpdate = `UPDATE employees
                        SET role_id = ?
                        WHERE id = ?`;

                            db.query(sqlUpdate, params, (err) => {
                                if (err) {
                                    throw err;
                                }
                                console.log("Employee Updated!");
                                return promptUser();
                            });
                        });
                });
            });
    });
};



// VIEW ROLES FUNCTION

const viewRoles = () => {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err) => {
        if (err) {
            throw err
        }
        console.log("\n");
        return promptUser();
    });
};

// ADD ROLE FUNCTION
//ADD IN ROLE ID!!!!!!!!!!!!

const addRole = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "roleName",
            message: "Enter new role",
        },
        {
            type: "input",
            name: "salary",
            message: "Enter salary for this role",
        }
    ])
        .then(answer => {
            const params = [answer.roleName, answer.salary];
            const sql = `INSERT INTO roles (title, salary)
        VALUES (?, ?)`;
            db.query(sql, params, (err) => {
                if (err) {
                    throw err
                }
                console.log("New Role Added!");
            });
        });
};

// VIEW DEPARTMENTS FUNCTION

const viewDepartments = () => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err) => {
        if (err) {
            throw err
        }
        console.log("\n");
        return promptUser();
    });
};

// ADD DEPARTMENT FUNCTION

const addDepartment = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "What is the department name?"
        }
    ])
        .then(answer => {
            const params = [answer.department]
            const sql = `INSERT INTO departments (name)
        VALUES (?)`;
            db.query(sql, params, (err) => {
                if (err) {
                    throw err
                };
                console.log("New Department Added!");
            });
        });
};

promptUser();


