var express = require('express');
const router = express.Router();

var mysql_dbc = require('../db/db_con');
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);


// 메인 컨텐츠의 댓글 불러오기
router.get('/getMainComment',(req, res) =>{
    
    
    let sql = `select com.comment_id , us.nickName , us.user_id , us.user_image , com.context, com.create_at , com.content_id
    from main_comment as com Join user as us
    on com.user_id = us.user_id 
    where com.active = 'Y'
    order by com.comment_id desc `;

    connection.query(sql, (err,result)=>{
        if(err){
            
        }else{
            let json = JSON.stringify(result);
            let resultinfo = JSON.parse(json);
            res.json(resultinfo);
        }
    })
});

// 질문 컨텐츠의 댓글 불러오기
router.get('/getAskComment',(req, res) =>{
    
    let sql = `select com.comment_id , us.nickName , us.user_id , us.user_image , com.context, com.create_at , com.content_id
    from ask_comment as com Join user as us
    on com.user_id = us.user_id 
    where com.active = 'Y'
    order by com.comment_id desc `;

    connection.query(sql, (err,result)=>{
        if(err){
            
        }else{
            let json = JSON.stringify(result);
            let resultinfo = JSON.parse(json);
            res.json(resultinfo);
        }
    })
});
// router.get('/getMainComment',(req, res) =>{
    
    
//     let content_id = req.body.content_id;
    

//     console.log(content_id);

//     let params = [content_id];
//     let sql = `select com.comment_id , us.nickName , us.user_image , com.context, com.create_at
//     from main_comment as com Join user as us
//     on com.user_id = us.user_id 
//     where com.active = 'Y' and com.content_id = ?
//     order by com.comment_id desc `;

//     connection.query(sql, params ,(err,result)=>{
//         if(err){
            
//         }else{
//             let json = JSON.stringify(result);
//             let resultinfo = JSON.parse(json);
//             res.json(resultinfo);
//         }
//     })
// });

// // 질문 컨텐츠의 댓글 불러오기
// router.get('/getAskComment',(req, res) =>{
    
    
//     let content_id = req.body.content_id;
    

//     console.log(content_id);

//     let params = [content_id];
//     let sql = `select com.comment_id , us.nickName , us.user_image , com.context, com.create_at
//     from ask_comment as com Join user as us
//     on com.user_id = us.user_id 
//     where com.active = 'Y' and com.content_id = ?
//     order by com.comment_id desc `;

//     connection.query(sql, params ,(err,result)=>{
//         if(err){
            
//         }else{
//             let json = JSON.stringify(result);
//             let resultinfo = JSON.parse(json);
//             res.json(resultinfo);
//         }
//     })
// });

// main 댓글 작성하기

router.post('/writeMainComment',(req,res)=>{

    let content_id = req.body.contentId;
    let user_id = req.body.userId;
    let context = req.body.context;

    
    let params = [content_id, user_id, context]; 
    let sql = `insert into main_comment(content_id, user_id , context) 
    values(?,?,?)`;

    connection.query(sql, params ,(err,result)=>{
        if(err){
            console.log('db 에러');
        }else{
            res.json({ result : true });
        }
    });

});

// ask 댓글 작성하기

router.post('/writeAskComment',(req,res)=>{

    let content_id = req.body.contentId;
    let user_id = req.body.userId;
    let context = req.body.context;

    
    let params = [content_id, user_id, context]; 
    let sql = `insert into ask_comment(content_id, user_id , context) 
    values(?,?,?)`;

    connection.query(sql, params ,(err,result)=>{
        if(err){
            console.log('db 에러');
        }else{
            res.json({ result : true });
        }
    });

});

// 댓글 삭제
router.post('/deleteComment',(req,res)=>{
    
    let room_num = req.body.roomNum;
    let content_id = req.body.contentId;
    let comment_id = req.body.commentId;

    let param = [content_id,comment_id];


    if(room_num === 1) {// main_contents의 댓글 삭제
        let sql = `update main_comment set active = 'n' where content_id = ? AND comment_id = ? `;
        connection.query(sql, param, (err,result)=>{
            if(err){
                console.log('db 에러');
            }else {
                res.json({ result : true});
            }
        })
    }else { // ask_contents의 댓글삭제
        let sql = `update ask_comment set active = 'n' where content_id = ? AND comment_id = ? `;
        connection.query(sql, param, (err,result)=>{
            if(err){
                console.log('db 에러');
            }else {
                res.json({ result : true});
            }
        })

    }
})



module.exports = router;
 