<template>
    <div class="change-container">
        <div class="profileBox" > 
            <div class="update-title">프로필 사진 변경</div> 
            <form action="" class="margin-20" method="post" enctype="multipart/form-data" >
                <div v-if="!previewImg">
                    <input type="file"  name="img" @change="onFileChange"  ref="profileImg" id="profileImg">
                    <a-button class="basicProfileBtn" @click="basicProfileChange">기본 이미지로 변경</a-button>
                </div>
                <div v-else class="preview-img-box">
                    <img :src="previewImg" class="preview-img"/>
                    <div class="margin-20"> 
                        <a-button @click="removeImage" class="removeBtn">초기화</a-button>
                        <a-button type="submit" @click="submitImage" class="submitBtn">변경하기</a-button>
                    </div>
                </div>
            </form>
        </div>

        <div class="nicknameBox " >
            <div class="update-title">닉네임 변경</div> 
            <a-input type="" class="changeInputSize" v-bind:value="userNickname" v-model="changeNickname"></a-input>
            <a-button v-if="checkOk">검사 완료!!</a-button>
            <a-button v-else-if="!checkOk"  @click="duplicateCheck()">중복</a-button>
            <div>
                <a-button class="margin-20" @click="nicknameUpdate()">닉네임 변경</a-button>
            </div>
            
        </div>
        <div class="pwBox">
            <div class="update-title">비밀번호 변경</div>
            <div class="pwInputBox">
                <div class="width-300">
                    <a-input class="changeInputSize pwInput" type="password" placeholder="기존 비밀번호" v-model="originalPw"></a-input>
                   <a-input class="changeInputSize pwInput" type="password" placeholder="새 비밀번호" v-model="newPw"></a-input>
                   <a-input class="changeInputSize pwInput" type="password" placeholder="비밀번호 확인" v-model="reEnterPw"></a-input>
                   <a-button class="pwBtn" @click="updatePwBtn()">비밀번호 변경</a-button>
                </div>
               
            </div>    
        </div>
    </div>

</template>



<script>

import { mapState } from 'vuex';

//https://okayoon.tistory.com/entry/vuejs-%EA%B8%B0%EC%B4%88-%EC%84%B8%EB%AF%B8%EB%82%98-%ED%9B%84%EA%B8%B0-3%ED%9A%8C%EC%B0%A8-%EC%BD%94%EB%94%A9%EC%95%A0%ED%94%8C


//https://www.mocky.io/v2/5cc8019d300000980a055e76
// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);

//   reader.onerror = (error) =>{
//       console.log('base64 err남~~~~~~~~~~~~~~~~~~~~~~~``');
//   }
// }

export default {
    data(){
        return {
            userId : this.$store.state.user.user.userId,
            previewImg: '',            // 미리보기 이미지 
            profileImg: '',           //서버로 갈것!! 
            userNickname: this.$store.state.user.user.nickName,
            changeNickname : this.$store.state.user.user.nickName, // 닉네임 변경
            nicknameCheck : this.$store.state.update.nicknameCheck, // true or false // 중복 아니면 true!! 
            checkOk : '', // 중복 검사 성공 시 true

            password : this.$store.state.user.user.password,
            originalPw: '', //기존 pw
            newPw: '',      //새로운 pw
            reEnterPw: '', //pw 재입력


        }
    },
    computed : {
        ...mapState('user',[
            'user'
        ]),
    
    },
    watch : {
        changeNickname() {
            this.checkOk = false;
        }
    },
    methods: {
        onFileChange(e) {

             console.log('refs : ',this.$refs.profileImg);
            // this.profileImg = this.$refs.profileImg.files[0];
        

            console.log('프로필 이미지',this.profileImg);
            
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]); // 미리보기 

            this.profileImg = this.$refs.profileImg.files[0];            
            console.log('프로필파일',this.profileImg);
        },

        submitImage(){ // 프로필 이미지 변경 

           
            const formData = new FormData();
            let userId = this.user.userId;
            formData.append('user_id',userId);
            formData.append('img', this.profileImg);
            


           
            this.$store.dispatch('user/profileUpdateProcess',{
                formData : formData,
            })
            this.$message.success('프로필 사진을 변경하였습니다.');
            this.$router.push({
                path: '/',
            });
            location.reload(); 



            // location.href = location.href;
            // history.go(0);  
            // axios.post('/api/userInfo/changeProfile', formData)
            // .then((res)=>{
            //  
            //     console.log(res);
            // })
            // .catch((err)=>{
            //    
            // });


           
            // this.$store.dispatch('user/profileChangeProcess',{  
            //     formData : options,
            //     config : config
            // })
            // console.log('변경하기 버튼에서 프로필이미지 확인하기 : ',this.profileImg);

           
            // formData.append('userImg',this.profileImg);



            //formData.append('profileImg',JSON.stringify( this.profileImg ));

            // console.log( '폼데이터1 :',formData);

            //  for(let key of formData.entries()){en
            //     console.log('key => ',key);
            // }

          
            
            // axios.post('/single-file',
            //     formData, 
            //     {
            //         headers: {
            //             'Content-Type': 'multipart/form-data'
            //         }
            //     }).then(()=>{
            //         console.log('SUCCESS!!!!!!!!');
            //     }).catch(()=>{
            //         console.log('FAILUER!!!!!!!!!');

            //     });
        
        //   console.log('임시변수 => ',this.임시유저아이디);


        },
        basicProfileChange(){ // 프로필 사진 기본 이미지로 변경 
            if(window.confirm("프로필 사진을 기본 이미지로 변경하시겠습니까?")){   
                this.$store.dispatch('user/basicProfileProcess', {
                    userId : this.userId
                });
                this.$message.success('기본 이미지로 변경하였습니다.');
                this.$router.push({ path: '/' });
                location.reload(); 

            }
        },

        async duplicateCheck(){ // 중복 검사

            if(!this.changeNickname){
                this.$message.info('닉네임을 입력해주세요.');
            } else if(this.userNickname === this.changeNickname){
                this.$message.info('동일한 닉네임입니다.');
            } else {
                await this.$store.dispatch('update/nicknameCheckProcess',{
                    changeNickname : this.changeNickname
                });
        
                this.nicknameCheck = this.$store.state.update.nicknameCheck;
            
                if(this.nicknameCheck){ // this.nicknameCheck == true 중복이 아니니 닉네임 변경 가능! 
                    this.$message.success('닉네임 변경이 가능합니다!');
                    this.checkOk = true;
                }else{
                    this.$message.info('중복입니다!!!!!!!!!!!!!!!!!!!!');
                    this.checkOk = false;
                }
            }  
        },

        async nicknameUpdate(){  //닉네임 변경

            if(this.checkOk){ // 변경 가능!
                await this.$store.dispatch('update/updateNicknameProcess',{
                    userId : this.userId,
                    changeNickname : this.changeNickname
                });
                 this.$message.success('닉네임이 성공적으로 변경되었습니다!');
                 this.$router.push({
                     path: '/',
                 });
            } else { //중복 검사 통과 X
                this.$message.info('중복 검사를 해주세요');
            }
           
        },


        updatePwBtn(){ //비밀번호 변경 

            //originalPw: '', //기존 pw
            //newPw: '',      //새로운 pw
            //reEnterPw: '', //pw 재입력
            if(this.originalPw === '' || this.newPw ==='' || this.reEnterPw ===''){
                 this.$message.info('비밀번호를 입력해주세요.');
            } else {
                if(this.password === this.originalPw){  // 기존 비밀번호와 일치 
                    if(this.originalPw === this.newPw){
                        this.$message.info('기존 비밀번호와 새 비밀번호가 동일합니다.');
                    } else if(this.newPw === this.reEnterPw) {
                        this.$store.dispatch('update/updatePwProcess',{
                            userId : this.userId,
                            newPassword : this.newPw
                        });
                        this.$message.success('비밀번호가 변경되었습니다!');
                        this.$router.push({
                            path: '/',
                        });
                    } else {
                        this.$message.info('비밀번호가 일치하지 않습니다.');
                    }
                } else {
                this.$message.info('비밀번호가 다릅니다.');
                }
            }  
        },


        

        createImage(file) {
            var previewImg = new Image();
            var reader = new FileReader();
            var vm = this;

            reader.onload = (e) => {
                vm.previewImg = e.target.result;
            };
            reader.readAsDataURL(file);
        },

        removeImage: function (e) {
        this.previewImg = '';
        }






    }, 
}
</script>


<style scoped>
.margin-20{
    margin: 20px;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.change-container{
    display: flex;
    align-items: center;
    flex-direction: column ;
    text-align: center;
   
}
.preview-img-box{
    flex-direction: column;
}
.preview-img{
    width : 200px;
    height: 200px;
    border-radius: 100%;
    object-fit: cover;
     /*
        object-fit: contain;
        object-fit: cover;
        object-fit: none;
        object-fit: scale-down;    
    */
}
.uploader-box{
    margin : 50px;
}

.update-title{
    font-size:20px;
    font-weight: bold;
    margin: 10px;
    
}

.changeInputSize{
    width: 200px;
    margin:10px;
}
/* .basicProfileBtn {

}
.removeBtn { 
    /* width : 100px;
    height: 30px; */
    /* font-size: 20px; 
}

.submitBtn {

} */

.profileBox{   
    margin: 30px;
    width: 800px;
    height: 350px;
    border: 1px solid rgb(247, 216, 216);
    background:rgb(238, 227, 233);

}
.nicknameBox{
    margin: 30px;
    width: 800px;
    height: 200px;
    border: 1px solid rgb(247, 216, 216);
    background:rgb(238, 227, 233);
}
.pwBox{
    margin: 30px;
    width: 800px;
    height: 300px;
    border: 1px solid rgb(247, 216, 216);
    background:rgb(238, 227, 233);
}

.pwInputBox{
    display: flex;
    justify-content: center; 
    align-items: center;
    margin: 20px;
}


.width-300{
    width: 300px;
}

.pwBtn{
    margin: 10px;
}

    /* img{
        width: 30%;
        margin: auto;
        display: block;
        margin-bottom: 10px;
    } */
</style>