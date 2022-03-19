var express = require('express');

const router = express.Router();

var mysql_dbc = require('../db/db_con');
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);

//내가 쓴 글 (Home) 
router.post('/homeWritePreview',(req, res)=>{

    let userId = req.body.userId;


    let sql = `select * from main_contents where user_id = ?`;

    connection.query(sql,[userId],(err,result)=>{
        if(err){

        }else{
            console.log('result => ',result);
            
            let json = JSON.stringify(result);
            let resultinfo = JSON.parse(json);
            res.json(resultinfo);
        }
    });

});

// 좋아요 (Home)
router.post('/homeLikePreview',(req, res)=>{

});
// 내가 쓴 글 (ask)
router.post('/askWritePreview',(req, res)=>{
    let userId = req.body.userId;


    let sql = `select * from ask_contents where user_id = ?`;

    connection.query(sql,[userId],(err,result)=>{
        if(err){

        }else{
            console.log('result => ',result);
            
            let json = JSON.stringify(result);
            let resultinfo = JSON.parse(json);
            res.json(resultinfo);
        }
    });
});

// 좋아요 (ask)
router.post('/askLikePreview',(req, res)=>{

});

module.exports = router;