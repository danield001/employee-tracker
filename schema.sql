

DROP TABLE IF EXISTS `departments`;

CREATE TABLE `departments` (
  `id` int NOT NULL,
  `dept_name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
)


DROP TABLE IF EXISTS `employees`;

CREATE TABLE `employees` (
  `id` INT NOT NULL,
  `first_name` VARCHAR(30) NOT NULL,
  `last_name` VARCHAR(30) NOT NULL,
  `role_id` INT NOT NULL,
  `manager_id` INT DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  KEY `manager_id` (`manager_id`),
  FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  FOREIGN KEY (`manager_id`) REFERENCES `employees` (`id`)
);

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int DEFAULT NOT NULL,
  `title` varchar(30) NOT NULL,
  `salary` decimal(10,2) NOT NULL,
  `department_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
) 
