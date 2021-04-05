
// // var mysql_dbc = require('./service.config')();

// var mysql_dbc = require('../db/db_con');
// var connection = mysql_dbc.init();

// mysql_dbc.test_open(connection);

// module.exports = {
//     user : (req,res) => {
//         var sql = 'select * from user';
//         connection.query(sql , params, function (error, rows, fields){
//             if(!error) {
//                 for(var i=0; i< rows.length; i++){
//                     console.log(rows[i]);
//                 }
//             } else {
//                 console.log('query error : '+ error);
//             }
//         });
//     }
// };