INSERT INTO departments (id, dept_name)
VALUES  (001, Sales),
        (002, Fincance),
        (003, Legal),
        (004, Engineering);

INSERT INTO roles (id, title, salary, department_id)
VALUES  (001, 'Sales Lead', 100000, 001),
        (002, 'Salesperson', 80000, 001),
        (003, 'Lead Engineer' 150000, 004),
        (004, 'Software Engineer', 120000, 004),
        (005, 'Account Manager', 160000, 002),
        (006, 'Accountant', 125000, 002),
        (007, 'Legal Team Lead', 250000, 003),
        (008, 'Lawyer', 190000, 003),

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES  (001, 'John', 'Doe', 001, ),
        (002, 'Mike', 'Chan', 002, ),
        (003, 'Ashley', 'Rodriguez', 003, ),
        (004, 'Kevin', 'Tupik', 004, ),
        (005, 'Kunal', 'Singh', 005, ),
        (006, 'Malia', 'Brown', 006, ),
        (007, 'Sarah', 'Lourd', 007, ),
        (008, 'Tom', 'Allen', 008, ),
        (009, 'Sam', 'Kash', 001, );
