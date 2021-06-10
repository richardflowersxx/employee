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
            console.log("Department added");
            startProgram()
        })
    })
}
// how do i get the all the manager from the database?
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
        },
        {
            type: "list",
            message: "what is the employee's role id?",
            choices:[1,2,3,4,5,6],
            name:"employeeRole"
        },

        {
            type: "list",
            message: "Enter manager id",
            name:"managerId",
            choices:[
                {
                    value: 1,
                    name: "ricardo flores"

                },
                {
                    value: 0,
                    name:"No Manager"
                },
                {
                    value:4,
                    name: "mak"
                }
            ]
        }
    ])
    .then(function(Response){
        connection.query("INSERT INTO employee(first_name, last_name, role_id, manager_id)values(?,?,?,?);",
        [Response.employeeFirst, Response.employeeLast, Response.employeeRole, Response.managerId], function(err,msg){
            if (err) throw err;
            console.log("Employee added");
            startProgram()
        });
    })
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "what role do you want to add?",
            name:"roleTitle"
        },
        {
            type: "input",
            message: "what salary do you want to give this role?",
            name:"roleSalary"
        },
        {
            type: "list",
            message: "what department do you want to add this role?",
            name:"roleDepartment",
            choices:[ 
                {
                    value:1,
                    name:"Finance"
                },
                {
                    value:2,
                    name:"Marketing"
                },
                {
                    value:3,
                    name:"Design"
                },
                {
                    value:4,
                    name:"Legal"
                },
                {
                    value:5,
                    name:"Production"
                }
            ]
        },
    ])
    .then(function(Response){
        console.log(Response)
        connection.query("insert into role(title,salary,department_id) values(?,?,?);",
        [Response.roleTitle,Response.roleSalary,Response.roleDepartment],
         function(err,msg){
            if (err) throw err;
            console.log("role added");
            startProgram()
        })
    })
}

function viewEmployee() {
 
        connection.query("select * from employee;",function(err,msg){
            if (err) throw err;
            console.table(msg);
            startProgram()
        })
    
}

function viewDepartment() {
 
    connection.query("select * from Department;",function(err,msg){
        if (err) throw err;
        console.table(msg);
        startProgram()
    })

}

function viewRole() {
 
    connection.query("select * from role;",function(err,msg){
        if (err) throw err;
        console.table(msg);
        startProgram()
    })

}