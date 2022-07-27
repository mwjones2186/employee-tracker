const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
      host: 'localhost',      
      user: 'root',
      password: 'ArthrexRep2011*',
      database: 'employees'
    },
  );
connection.connect(function (err){
  if  (err) throw err
})


  module.exports = connection;