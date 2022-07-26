const inquirer = require('inquirer');
const connection = require('./connection');


class Data {
    constructor(connection){
        this.connection = connection
    }

    findDepartments(){
        // THEN I am presented with a formatted table showing department names and department ids
        return this.connection.promise().query('SELECT * FROM department;')
    }
    
    findRoles(){
        // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
        return this.connection.promise().query('SELECT role.title, role.id, role.salary, department.name AS departmentName FROM role LEFT JOIN department ON role.department_id = department.id;')
    }
    
    findEmployees(){
        // THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
        return this.connection.promise().query('SELECT employee.id, employee.first_name, employee.last_name, role.title , role.salary, department.name AS departmentName, CONCAT(manager.first_name, " ", manager.last_name) as Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee AS manager ON manager.id = employee.manager_id;')
        
    }
    
    createDepartment(name){
        
        // WHEN I choose to add a department
        // THEN I am prompted to enter the name of the department and that department is added to the database
        return this.connection.promise().query(`INSERT INTO department set ?`, name)
      
    }
    
    createRole(role){
        // WHEN I choose to add a role
        // THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
        return this.connection.promise().query(`INSERT INTO role set ?`, role)
    }
    
    createEmployee(employee){
        // WHEN I choose to add an employee
        // THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
        return this.connection.promise().query(`INSERT INTO employee set ?`, employee)
    }
    
    updateRole(newRole){
        // WHEN I choose to update an employee role
        // THEN I am prompted to select an employee to update and their new role and this information is updated in the database
        return this.connection.promise().query(`ALTER TABLE employee ALTER COLUMN role.title, role.salary, department.name, CONCAT(manager.first_name, " ", manager.last_name) as Manager `, newRole)
    }
};

module.exports =  new Data(connection)