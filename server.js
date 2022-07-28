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
                updateEmployeeRole()
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

async function newDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'departmentChoice',
        message: 'What department would you like to add?'
        
    }).then((res) => {
        return db.createDepartment(res)
        
        // .then(([res])=>{
        //     console.table(res)
        // })
        // .then(()=> start())
        
        
        // console.log(res)
        // return db.createDepartment()
        
    })
    // .then (console.table(data))
    
};

function newRole() {
    db.createRole().then(([data]) => {
        console.table(data)
    }).then(() => start())
}

function newEmployee() {
    db.createEmployee().then(([data]) => {
        console.table(data)
    }).then(() => start())
}

function updateEmployeeRole() {
    db.updateRole().then(([data]) => {
        console.table(data)
    }).then(() => start())
}



start();

