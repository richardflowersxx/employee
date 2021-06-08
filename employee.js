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
}