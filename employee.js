var inquirer = require("inquirer")

var mysql = require("mysql")

var consoleTable = require("console.table")
require("dotenv").config()

var connection  = mysql.createConnection({
    host: "localhost",
    port:"3306",
    user: "root",
    password:process.env.MYSQL,
    database:"employee_db"
})

connection.connect(function(err){
    if (err) throw err;
    console.log("Welcome to Employee tracker - backend app");
    startProgram()
})

function startProgram() {
     console.log("what do you wish to do?")
     inquirer.prompt([
         {
             type:"list",
             message:"What would you like to do ?",
             choices:["Add Employee","Add Department","Add Role","View Employee","View Department","View Role","Update Employee Role","Exit App"],
             name:"userEntry"
         }
     ]).then(function(options){
         switch(options.userEntry){
             case "View Employee":
                 viewEmployee();
                 break;
                 case "View Department":
                 viewDepartment();
                 break;
                 case "View Role":
                 viewRole();
                 break;
                 case "Add Department":
                 addDepartment();
                 break;
                 case "Add Employee":
                 addEmployee();
                 break;
                 case "Add Role":
                 addRole();
                 break;
                 case "Update Employee Role":
                 updateEmployee();
                 break;
             default:
                 connection.end();
                 process.exit(0)
         }
     })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "department name",
            name:"departmentName"
        }
    ])
    .then(function(Response){
        connection.query("insert into department(name)values(?);",Response.departmentName, function(err,msg){
            if (err) throw err;
            console.log("Department added",msg);
            startProgram()
        })
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "employee first name",
            name:"employeeFirst"
        },
        {
            type: "input",
            message: "employee last name",
            name:"employeeLast"
        }
        
    ])
    .then(function(Response){
        connection.query("insert into employee(first_name, last_name, role_id, manager_id)values(?,?,?,?);",[Response.employeeFirst, Response.employeeLast, 1, 1], function(err,msg){
            if (err) throw err;
            console.log("Employee added");
            startProgram()
        });
    })
}