var express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});



// router.get('/',function(req, res, next){
//   console.log("왜안돼 왜안돼 왜 안되냐구ㅜㅇ나ㅣㄹ나ㅣ얼닝러ㅣㄴ");
//   if(req.isAuthenticated() && req.user){
//       console.log("잘 넘sfdsfsdkf;sdlkfpweofjsdlkjflweksjf어왔는가???! 1111");
//       return res.json({ user : req.user });
//   }
//   return res.json({ user : null });
// });


// router.get('/', (req, res, next) => {  // 3
//   console.log('index.js req.session =>',req.session);
//   if(!req.session.num){
//     req.session.num = 1;
//   } else {
//     req.session.num = req.session.num + 1;
//   }
//   res.send(`Number : ${req.session.num}`);
// });






// router.get('/',(req,res)=>{
//   if(req.user && req.user.id){
//     res.render('api/auth/welcome', {dname:req.user.id});
//   } 
// })



module.exports = router;
 