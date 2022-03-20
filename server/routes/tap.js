var express = require('express');

const router = express.Router();

var mysql_dbc = require('../db/db_con');
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);

//내가 쓴 글 (Home) 
router.post('/homeWritePreview',(req, res)=>{

    let userId = req.body.userId;


    // let sql = `select * from main_contents where user_id = ?`;

    let sql = `select co.content_id , co.title, co.content , co.preview_image, co.view_num, co.like_num,co.create_at, 
    co.board_num, us.nickname
    from main_contents as co JOIN user as us
    on co.user_id = us.user_id
    where co.active = 'Y' and co.user_id = ?
    order by co.content_id desc`;

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

    let userId = req.body.userId;

    let sql = `select co.content_id , co.title, co.content , co.preview_image, co.view_num, co.like_num,co.create_at, 
    co.board_num, us.nickname
    from main_contents as co JOIN user as us
    on co.user_id = us.user_id
    where co.active = 'Y' and co.user_id = 2 
    order by co.content_id desc`;

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