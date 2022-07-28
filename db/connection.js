
const mysql = require('mysql2');


const connection = mysql.createConnection(
    {
      host: 'localhost',      
      user: 'root',
      //please enter your password below
      password: 'ENTER YOUR PASSWORD',
      database: 'employees'
    },
  );
connection.connect(function (err){
  if  (err) throw err
})


  module.exports = connection;