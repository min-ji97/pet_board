var express = require('express');
const router = express.Router();

var mysql_dbc = require('../db/db_con');
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);


router.get('/getMainPostPreview',(req,res)=>{
    
    // mainContent 테이블?! introContent 테이블?!?!?!
    //  여기에 + 유저 닉네임 가져가야한다!!!!!!!!!

    let sql = `select co.content_id , co.title, co.content , co.preview_image, co.view_num, co.like_num,co.create_at, co.board_num, us.nickname
    from main_contents as co JOIN user as us
    on co.user_id = us.user_id
    where co.active = 'Y'
    order by co.content_id desc`;

    connection.query(sql,(err,result)=>{
        if(err){

        }else{
            console.log('result => ',result);
            console.log('왜 안떠!!',result);
            let json = JSON.stringify(result);
            let resultinfo = JSON.parse(json);
            res.json(resultinfo);
        }
    });
});

router.get('/getAskPostPreview',(req,res)=>{
    let sql = `select co.content_id, co.title , co.content, co.view_num, co.like_num, co.create_at, co.board_num, us.nickname
    from ask_contents as co JOIN user as us
    on co.user_id = us.user_id
    where co.active = 'Y'
    order by co.content_id desc`;

    connection.query(sql,(err,result)=>{
        if(err){
            console.log('db 에러');
        } else {
            let json = JSON.stringify(result);
            let resultInfo = JSON.parse(json);
            res.json(resultInfo);
        }
    });
});








router.post('/mainWrite',(req,res)=>{

    let user_id = req.body.userId;
    let title = req.body.title;
    let content = req.body.contents;
    let previewImg = req.body.previewImg;

    let params = [user_id, title, content, previewImg]; 
    let sql = `insert into main_contents(user_id , title, content, preview_image, board_num) 
    values(?,?,?,?, 1 ) `;

    connection.query(sql, params ,(err,result)=>{
        if(err){
            console.log('db 에러');
        }else{
            res.json({ result : true });
        }
    })
    // sql 인설트 하는거 만들고! -> 서버에 정보를 저장!! 저장이 완료되면 클라이언트로 true를 보내쟈!

    // 이제 저장이 되면 잘 불러왔는지 확인....!!!
    // 메인페이지도 잘 되는지 보기~~~~ 
    
});

router.post('/askWrite',(req, res)=>{

    let user_id = req.body.userId;
    let title = req.body.title;
    let content = req.body.contents;
    let board_num = req.body.boardNum;

    let params = [user_id, title, content , board_num];
    let sql = `insert into ask_contents(user_id , title, content, board_num) 
    values( ? , ? , ? , ? )`;

    connection.query(sql, params , (err,result)=>{
        if(err){
            console.log('db 에러');
        } else {
            res.json({ result : true });
        }
    })

});


module.exports = router;
 