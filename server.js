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
                console.log(1)
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
    console.log(2);
    db.query(sql, (err, rows) => {
        if (err) {
            throw err
        }
        console.table(rows);
        return promptUser();
    });
};

// ADD EMPLOYEE FUNCTION

const addEmployee = () => {
    const sql = 'SELECT * FROM roles';
    db.query(sql, async (err, rows) => {
        try {
            if (err) {
                throw err;
            }

            const roles = rows.map(({ id, title }) => ({ value: id, name: title }));
            const answer = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'id',
                    message: 'What is employee id?'
                },
                {
                    type: 'input',
                    name: 'firstName',
                    message: "What is the employee's first name?"
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: "What is the employee's last name?"
                },
                {
                    type: 'list',
                    name: 'role',
                    message: "What is the employee's role?",
                    choices: roles
                }
            ]);

            const params = [answer.id, answer.firstName, answer.lastName, answer.role];
            const insertSql = 'INSERT INTO employees (id, first_name, last_name, role_id) VALUES (?, ?, ?, ?)';

            db.query(insertSql, params, (insertErr) => {
                if (insertErr) {
                    throw insertErr;
                }

                console.log('Employee added to database!');
                promptUser();
            });
        } catch (error) {
            console.error('Error adding employee:', error);
        }
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
    db.query(sql, (err, rows) => {
        if (err) {
            throw err
        }
        console.table(rows);
        return promptUser();
    });
};

// ADD ROLE FUNCTION

const addRole = () => {

    const sqlDept = `SELECT dept_name, id FROM departments`;
    db.query(sqlDept, (err, rows) => {
        if (err) {
            throw err;
        }

        const departments = rows.map(({ id, dept_name }) => ({ value: id, name: dept_name }));

        inquirer.prompt([
            {
                type: 'input',
                name: "id",
                message: 'Enter role id'
            },
            {
                type: "input",
                name: "roleName",
                message: "Enter new role",
            },
            {
                type: "input",
                name: "salary",
                message: "Enter salary for this role",
            },
            {
                type: 'list',
                name: 'department',
                message: 'Select department for role',
                choices: departments
            }
        ])
            .then(answer => {
                const params = [answer.id, answer.roleName, answer.salary, answer.department];
                const sql = `INSERT INTO roles (id, title, salary, department_id)
        VALUES (?, ?, ?, ?)`;
                db.query(sql, params, (err) => {
                    if (err) {
                        throw err
                    }
                    console.log("New Role Added!");
                    return promptUser();
                });
            });
    });
};

// VIEW DEPARTMENTS FUNCTION

const viewDepartments = () => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err
        }
        console.table(rows);
        return promptUser();
    });
};

// ADD DEPARTMENT FUNCTION

const addDepartment = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Enter new department id"
        },
        {
            type: "input",
            name: "department",
            message: "What is the department name?"
        }
    ])
        .then(answer => {
            const params = [answer.id, answer.department]
            const sql = `INSERT INTO departments (id, dept_name)
        VALUES (?, ?)`;
            db.query(sql, params, (err) => {
                if (err) {
                    throw err
                };
                console.log("New Department Added!");
                return promptUser();
            });
        });
};

promptUser();


