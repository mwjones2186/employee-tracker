const inquirer = require('inquirer');
const { createDepartment, findDepartments } = require('./db');
const db = require('./db');

require('console.table');


function start() {
    const choicesArr = ['IT', 'HR', 'Admin'];

    // THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
    inquirer.prompt({
        type: 'list',
        name: 'userChoice',
        message: 'what would you like to do?',
        choices: [
            'view all departments',
            'view all roles',
            'view all employees',
            'add a department',
            'add a role',
            'add an employee',
            'update an employee role',
            'quit']
    }).then((res) => {
        switch (res.userChoice) {
            case 'view all departments':
                viewDepartments();
                break;
            case 'view all roles':
                viewRoles();
                break;
            case 'view all employees':
                viewEmployees();
                break;
            case 'add a department':
                newDepartment()
                break;
            case 'add a role':
                newRole()
                break;
            case 'add an employee':
                newEmployee()
                break;
            case 'update an employee role':
                updateRole()
                break;
            case 'update an employee role':
                removeEmployee()
                break;
            default:
                process.exit()

        }
    })

};

function viewDepartments() {
    db.findDepartments().then(([data]) => {
        console.table(data)
    }).then(() => start())
}

function viewRoles() {
    db.findRoles().then(([data]) => {
        console.table(data)
    }).then(() => start())
}

function viewEmployees() {
    db.findEmployees().then(([data]) => {
        console.table(data)
    }).then(() => start())
}

function newDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'What department would you like to add?'

    }).then((res) => {
        db.createDepartment(res)
    }).then(() => start())
};

function newRole() {
    db.findDepartments().then(([data]) => {
        const deptChoices = data.map(({ id, name }) => ({
            name: name,
            value: id
        }));


        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the new Role you would like to add?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary you would like to add?'
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'What is the new Role you would like to add?',
                choices: deptChoices
            }
        ]).then((res) => {
            db.createRole(res)
        }).then(() => start())
    })

};

function newEmployee() {
    db.findRoles().then(([data]) => {
        const roleChoice = data.map(({ id, title }) => ({
            name: title,
            value: id
        }));

    db.findEmployees().then(([data]) => {
        const managerId = data.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
         }));
        //  need to find a solution for returning NULL for all employee adds. Thinking an if statement or possibly a map.get() but not sure at the moment. Need to dig.

        inquirer.prompt([

            {
                type: 'input',
                name: 'first_name',
                message: 'What is the new employees first name?'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the new employees last name?'
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Please select a role for the new employee.',
                choices: roleChoice
            },
                       
        ]).then((res) => {
            db.createEmployee(res)
        }).then(() => start())
    
    })
});


function updateEmployeeRole() {
    

    db.updateRole().then(([data]) => {
        console.table(data)
    }).then(() => start())
}

};

start();
