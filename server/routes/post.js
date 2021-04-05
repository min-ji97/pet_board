var express = require('express');
const router = express.Router();

var mysql_dbc = require('../db/db_con');
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);


router.get('/getMainPostPreview',(req,res)=>{
    console.log('여기는 getPreviewPost입니댱');
    // mainContent 테이블?! introContent 테이블?!?!?!
    //  여기에 + 유저 닉네임 가져가야한다!!!!!!!!!

    let sql = `select co.content_id , co.title, co.context , co.preview_image, co.image, co.view_num, co.like_num,co.create_at,us.nickname
    from main_contents as co JOIN user as us
    on co.user_id = us.user_id
    where co.active = 'Y'
    order by co.content_id desc`;

    connection.query(sql,(err,result)=>{
        if(err){

        }else{
            console.log('result => ',result);

            let json = JSON.stringify(result);
            let resultinfo = JSON.parse(json);
            console.log('resultInfo =>',resultinfo);
            res.json(resultinfo);

        }
    });
})





module.exports = router;
 