var express = require('express');
var multer = require('multer');
const path = require('path');  // 이렇게 하면 안될듯.... app.js에 이미 path 받아옴 
const router = express.Router();

var mysql_dbc = require('../db/db_con');
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);


  const _storage = multer.diskStorage({
      destination: (req, file, cb) => {  // 파일 저장 위치
        cb(null, '../server/public/images');
      },
      filename: (req, file, cb) => {  // 파일명 설정
        let newFileName = new Date().valueOf() + path.extname(file.originalname);
        console.log('최종파일이름! ',newFileName);
        cb(null, newFileName);
      },
    })

  const upload = multer({ storage : _storage });


  // router.post('/changeProfile', upload.single('img'),userImg.updateImg);


  // router.post('/changeProfile', (req, res,next) =>{
  //   const uploadThree = multer({ storage : _storage }).single('img');
  //   uploadThree(req,res,(err)=>{
  //     if(err){
  //       console.log(err);
  //       return res.end('Error uploading file');
  //     } else {
  //       res.end("File is uploaded");

  //     }
  //   })
  // });



//////////////////////이거 지우는 거 맞지?!ㅋㅋㅋㅋㅋ허허헣
  // router.post('/userInfoUpdate',(req,res,next)=>{
  //   console.log('유저 정보를 업데이트하기 위한!');
  //   let user_id = req.body.user_id;
  //   let sql = `select * from user where user_id = ?`;
  //   let param = [ user_id ];

  //   connection.query(sql,[user_id],(err,result)=>{
  //     if(err){

  //     }else {
  //       console.log(' 유저 정보 업데이트 결과 = >',result);
  //     }
  //   });

  // });
  


  router.post('/updateProfile', upload.single('img'), (req, res,next) =>{
    console.log('req.files 입니다 =>',req.file );
    console.log('경로는?! => ,', req.file.path);
    let user_image = req.file.filename;
    let user_id = req.body.user_id; 
    let sql = `update user set user_image = ? where user_id = ? `;
    
    
    let params = [user_image , user_id];

    connection.query(sql, params , (err,result) => {
      if(err) {
        console.log('mysql 에러입니당 지금 여기서 에러가 난거니...??',err);

      } else {
        console.log('에러 안난댜!!!!!!!!!!!!!!');
        console.log('뭔데 결과가 ㅡㅡ',result);
        
        console.log('=================== >req => ',req.user);
        // let json = JSON.stringify(req.user);
        // let userInfo = JSON.parse(json);
        res.json({ user_image });
      }
    });

    //   console.log('req.body =>' ,req.body.user_id);//아무것도 없는게 맞음! req.body는 사진이 아닌 text형식의 데이터를 받기때문! 나는 text안받았으니까 비어있어야함
    //   console.log('req.file =>' ,req.file);//사진은 여기서 받음!!    

  });

  router.post('/uploadContentImg',upload.single('src'),(req,res)=>{
    console.log('여기는 사진 미리 업로드! ( 서 버 )');
    console.log('여기는 req.files (array) => ',req.file);
    console.log('여기는 req.file  (array) => ', req.file.filename);
    const content_image = req.file.filename;
    res.json({ content_image });
});





module.exports = router;