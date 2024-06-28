var express = require('express');

const router = express.Router();

var mysql_dbc = require('../db/db_con');
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);


// 메인 게시글 수정
router.post('/updateMain',(req,res)=>{
    let user_id = req.body.userId;
    let content_id = req.body.contentId;
    let title = req.body.title;
    let content = req.body.contents;
    let preview_image = req.body.previewImg;

    let params = [title, content, preview_image, user_id, content_id, ]; 
    let sql = `update main_contents set title = ? , content = ? , preview_image =? where user_id = ? and content_id =?`;
    console.log(params);
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
// 질문 게시글 수정
router.post('/updateAsk',(req, res)=>{
    let user_id = req.body.userId;
    let content_id = req.body.contentId;
    let title = req.body.title;
    let content = req.body.contents;
    // let board_num = req.body.boardNum;

    let params = [title, content , user_id,  content_id];
    let sql = `update ask_contents set title = ? , content = ? where user_id = ? and content_id =?`;

    
    console.log(params);
    connection.query(sql, params , (err,result)=>{
        if(err){
            console.log('db 에러');
        } else {
            res.json({ result : true });
        }
    })

});

router.post('/nickNameCheck',(req,res)=>{
    console.log('req.body => ',req.body);

    let nickName = req.body.changeNickname;
    let sql = `select nickname from user where nickname = ? `;
    
    connection.query(sql,[nickName],(err,result)=>{
        if(err) {
            
        }else {
           
            if(result[0]){ // 중복 === false 전송
                res.json(false);
            }else{  // 중복X === true 전송
                res.json(true);
            }
            
            
        }
    });
})

router.post('/idCheck', (req, res)=>{
    console.log('회원가입 - 아이디 중복체크 ');

    let id = req.body.changeId;
    let sql= `select id from user where id = ? `;

    connection.query(sql,[id],(err, result) => {
        if(err) {

        }else{
            if(result[0]){  // 중복임 false 전송
                res.json(false);
            }else{   // 없음 true 전송 
                res.json(true);
            }
        }
    })
})

router.post('/updateNickname',(req,res)=>{

    let userId = req.body.userId;
    let updateNickname = req.body.changeNickname;
    let sql = `update user set nickname = ?  where user_id = ? `;

    connection.query(sql,[updateNickname , userId],(err,result)=>{
        if(err){

        } else{
            res.json({nickname : updateNickname});
        }
    });
})

router.post('/updatePw',(req,res)=>{
    let userId = req.body.userId;
    let newPassword = req.body.newPassword;
    let sql = `update user set password = ? where user_id = ?`;

    connection.query(sql,[newPassword, userId],(err,result)=>{
        if(err){
        }else {
            res.json({password : newPassword});
        }
    })
})

router.post('/updateMainComment',(req,res)=>{
    let commentId = req.body.commentId;
    let contentId = req.body.contentId;
    let context = req.body.context;
    let sql = `update main_comment set context = ? where comment_id =? and content_id = ?  `;

    connection.query(sql,[context, commentId ,contentId ],(err,result)=>{
        if(err){
        }else{
            res.json({context : context});
        }
    })
})

router.post('/updateAskComment',(req,res)=>{
    let commentId = req.body.commentId;
    let contentId = req.body.contentId;
    let context = req.body.context;
    let sql = `update ask_comment set context = ? where comment_id =? and content_id = ?  `;

    connection.query(sql,[context, commentId ,contentId ],(err,result)=>{
        if(err){
        }else{
            res.json({context : context});
        }
    })
})






module.exports = router;