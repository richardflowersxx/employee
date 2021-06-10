use employee_db;
insert into department(name)values("Finance");
insert into role(title,salary,department_id)
values("Manager",12000,1);
insert into employee(first_name,last_name,role_id)values("ricardo","flores","lawyer");

select * from department;
select * from role;
select * from employee;
