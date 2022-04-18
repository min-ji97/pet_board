var express = require('express');
const router = express.Router();

var mysql_dbc = require('../db/db_con');
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);


// 회원가입
router.post('/register',(req, res) =>{
    console.log('서버로 드디어 넘어옴..!!!!!이예!!!');
    
    let name = req.body.name;
    let nickName = req.body.nickName;
    let id = req.body.id;
    let password = req.body.password;

    console.log(name, nickName, id, password);

    let params = [name, nickName, id, password ];
    let sql = `insert into user(name, nickname , id, password)
    values(?,?,?,?)`;

    connection.query(sql, params,(err,result)=>{
        if(err){
            
        }else{
            res.json({ result : true });
        }
    })
});

// 메인 게시글 미리보기 
router.get('/getMainPostPreview',(req,res)=>{
    
    // mainContent 테이블?! introContent 테이블?!?!?!
    //  여기에 + 유저 닉네임 가져가야한다!!!!!!!!!

    let sql = `select co.content_id , co.title, co.content , co.preview_image, co.view_num, co.like_num,co.create_at, co.board_num, us.nickname , us.user_id
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

// 질문 게시글 미리보기
router.get('/getAskPostPreview',(req,res)=>{
    console.log('큐엔이이 게시판 안들어오냐??');
    let sql = `select co.content_id, co.title , co.content, co.view_num, co.like_num, co.create_at, co.board_num, us.nickname ,us.user_id
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

// 메인 게시글 작성
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

// 질문 게시글 작성 
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

// 조회수 증가 
router.post('/viewUp',(req,res)=>{
    let content_id = req.body.contentId;
    let board_num = req.body.boardNum;

    let params = [content_id];
    if(board_num === 1){ //main_contents 테이블을 불러봐라..!
        let sql = 'update main_contents set view_num = view_num + 1 where content_id = ? ';
        
        connection.query(sql, params, (err,result)=>{
            if(err){
                console.log('db 에러');
            }else {
                res.json({ result : true});
            }
        })
    }else if(board_num === 2){ //ask_contents 테이블
        let sql = 'update ask_contents set view_num = view_num + 1 where content_id = ? ';
        
        connection.query(sql, params, (err,result)=>{
            if(err){
                console.log('db 에러');
            }else {
                res.json({ result : true});
            }
        })
    }
    
});

router.post('/deletePost',(req,res)=>{
    let content_id = req.body.contentId;
    let board_num = req.body.boardNum;

    let param = [content_id];

    if(board_num === 1) {// main_contents의 게시글을 삭제
        let sql = `update main_contents set active = 'n' where content_id = ? `;
        connection.query(sql, param, (err,result)=>{
            if(err){
                console.log('db 에러');
            }else {
                res.json({ result : true});
            }
        })
    }else { // ask_contents의 게시글을 삭제
        let sql = `update ask_contents set active = 'n' where content_id = ? `;
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
 