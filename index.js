const mysql = require('mysql');
const express = require('express');
const md5 = require('md5');
require('dotenv').config()
const {
    HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME
} = process.env;

var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));

app.get('/test',(req,res) =>{
    res.send("App Working");
    console.log(HOST);
    console.log("testing log");
})

app.post('/students',(req,res) =>{
    console.log(req.body)
    let hashPwd = md5(req.body.password);
    let sql = `INSERT INTO student (fName,lName,email,password) VALUES ('${req.body.fName}', '${req.body.lName}', '${req.body.email}', '${hashPwd}')`
    mysqlConnection.query(sql,function(err,result){
        console.log(err);
        if(!err)
            res.send({statue:true,msg:'success'})
        else
            res.send({status:false})
    })
})

app.put('/students', (req,res) =>{
    console.log(req.body)
    let hashPwd =  md5(req.body.password);
    let updateSql = `UPDATE student SET
                        fName='${req.body.fName}',
                        lName='${req.body.lName}',
                        email='${req.body.email}',
                        password='${hashPwd}'
                    WHERE
                        SID='${req.body.SID}'`;
    mysqlConnection.query(updateSql,function(err,result){
        console.log(err);
        if(!err)
            res.send({statue:true,msg:'Successfully Updated'})
        else
            res.send({status:false})
    })
})

//Get all Students
app.get('/students', (req, res) => {
    mysqlConnection.query('SELECT * FROM student', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an Student by Id
app.get('/students/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM student WHERE SID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an Student by Id
app.delete('/students/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM student WHERE SID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Student Record Deleted successfully....!');
        else
            console.log(err);
    })
});

//Insert an employees
app.post('/students', (req, res) => {
    let student = req.body;
    var sql = "SET @SID = ?;SET @fName = ?;SET @lName = ?;SET @email = ?;SET @password = ?; \
    CALL StudentAddOrEdit(@SID,@fName,@lName,@email,@password);";
    mysqlConnection.query(sql, [student.SID, student.fName ,student.lName, student.email, student.password], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted student id : '+element[0].SID);
            });
        else
            console.log(err);
    })
});