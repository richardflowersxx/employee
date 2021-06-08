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
     console.log("hello")
     inquirer.prompt([
         {
             type:"list",
             message:"What would you like to do ?",
             choices:["Add Employee","Add Department","Add Role","View Employee","View Department","View Role","Update Employee Role","Exit App"],
             name:"userentry"
         }
     ]).then(function(options){
         switch(options.userentry){
             case "View Employee":
                 viewemployee();
                 break;
                 case "View Department":
                 viewdepartment();
                 break;
                 case "View Role":
                 viewrole();
                 break;
                 case "Add Department":
                 adddepartment();
                 break;
                 case "Add Employee":
                 addemployee();
                 break;
                 case "Add Role":
                 addrole();
                 break;
                 case "Update Employee Role":
                 updateemployee();
                 break;
             default:
                 connection.end();
                 process.exit(0)
         }
     })
}

function adddepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "department name",
            name:"departmentname"
        }
    ])
    .then(function(Response){
        connection.query("insert into department(name)values(?);",Response.departmentname, function(err,msg){
            if (err) throw err;
            console.log("Department added",msg);
            startProgram()
        })
    })
}