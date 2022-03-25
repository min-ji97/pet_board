var express = require('express');

const router = express.Router();

var mysql_dbc = require('../db/db_con');
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);




router.post('/nickNameCheck',(req,res)=>{
    console.log('닉네임 중복 체크로 들어옴ㅎㅎ');
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
    console.log('닉네임 변경 바디 확인 => ',req.body);
    
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




module.exports = router;