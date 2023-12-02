INSERT INTO departments (id, dept_name)
VALUES  (001, 'Sales'),
        (002, 'Fincance'),
        (003, 'Legal'),
        (004, 'Engineering');

INSERT INTO roles (id, title, salary, department_id)
VALUES  (001, 'Sales Lead', 100000, 001),
        (002, 'Salesperson', 80000, 001),
        (003, 'Lead Engineer', 150000, 004),
        (004, 'Software Engineer', 120000, 004),
        (005, 'Account Manager', 160000, 002),
        (006, 'Accountant', 125000, 002),
        (007, 'Legal Team Lead', 250000, 003),
        (008, 'Lawyer', 190000, 003);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES  (1, 'John', 'Doe', 1, NULL),
        (2, 'Mike', 'Chan', 2, 1),
        (3, 'Ashley', 'Rodriguez', 3, NULL),
        (4, 'Kevin', 'Tupik', 4, 3),
        (5, 'Kunal', 'Singh', 5, NULL),
        (6, 'Malia', 'Brown', 6, 5),
        (7, 'Sarah', 'Lourd', 7, NULL),
        (8, 'Tom', 'Allen', 8, 7),
        (9, 'Sam', 'Kash', 2, 1);

