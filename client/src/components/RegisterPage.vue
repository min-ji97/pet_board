<template>
    <div class="align-center">
      <div class="form-title">
        <h1 @click="duplicateCheckNickname()">회원가입</h1>
      </div>
      
      <!-- <div class="align-center"> -->
        
        <div  class="container">
          <a-form :form="form" @submit="handleSubmit" class="form-box" >
            <div class="input-box">
              <!-- 이름 -->
              
              <a-form-item >
                <span>이름</span>
                  <a-input
                      v-decorator="[
                      'realname',
                      {
                        rules: [{ required: true, message: 'Please input your name!', }],
                      },
                      ]"
                  />
              </a-form-item>
              <!-- 닉네임 -->
              <a-form-item >
                <span>닉네임</span>
                  <a-input class="input-nickname"  
                    :class="{ 'input-border-red' : !checkNickName } "
                    v-decorator="[
                      'nickname',
                      {
                        rules: [
                          { 
                            required: true, 
                            message: 'Please input your nickname!' 
                          },
                          {
                            validator:  checkNickName
                          },
                          ],
                      }
                    ]"
                    v-model="changeNick"
                    
                    type="name"
                  
                  />
                  <a-button v-if="checkNickName" class="ok-btn btn">OK</a-button>
                  <a-button v-else-if="!checkNickName" class="dupli-btn btn"  @click="duplicateCheckNickname()">중복검사</a-button> 
             </a-form-item>
           
              <!-- 아이디  -->
              <a-form-item>
                <span>아이디</span>
                  <a-input class="input-id" :class="{ 'input-border-red' : !checkId } "
                      v-decorator="[
                      'id',
                      {
                        rules: [
                          { required: true, message: 'Please input your id!', whitespace: true }
                          
                        ],
                      },
                      ]"
                       v-model="changeId"
                  />
                  <a-button v-if="checkId" class="ok-btn btn">OK</a-button>
                  <a-button v-else-if="!checkId" class="dupli-btn btn" @click="duplicateCheckId()">중복검사</a-button>
              </a-form-item>

              <!-- 비밀번호 -->
              <a-form-item has-feedback>
                <span>비밀번호</span>
                  <a-input
                      v-decorator="[
                        'password',
                        {
                          rules: [
                            {
                              required: true,
                              message: 'Please input your password!',
                            },
                            {
                              validator: validateToNextPassword,
                            },
                          ],
                        },
                      ]"
                      type="password"
                  />
              </a-form-item>

              <!-- 비밀번호 확인 -->
              <a-form-item has-feedback>
                <span>비밀번호 확인</span>
                  <a-input
                      v-decorator="[
                      'confirm',
                      {
                          rules: [
                            {
                              required: true,
                              message: 'Please confirm your password!',
                            },
                            {
                              validator: compareToFirstPassword,
                            },
                          ],
                      },
                      ]"
                      type="password"
                      @blur="handleConfirmBlur"
                  />
                </a-form-item>
              </div>

              <div class="btn-box">
                <a-form-item class="btn-box">
                  <a-button class="submit-btn"  type="primary" html-type="submit">
                    Register
                  </a-button>
                  <div class="btn-login" @click="goToLogin()">login</div>
                </a-form-item>
              </div>
          </a-form>
        </div>    
      </div>
    <!-- </div> -->
</template>

<script>

import { mapState } from 'vuex';

// const inputNickClass = document.querySelector('.input-nickname');
// const inputIdClass = document.querySelector('.input-id');



export default {
  
  data() {
  
    return {


      changeNick:'',  // 입력한 닉네임 (v-model)
      changeId: '', // 입력한 아이디 (v-model)
      
      
  
      // newNickName : '',
      
      // 중복 검사에 쓰이는 boolean값..! (dom에서 사용함)
      checkNickName: '',
      checkId: '',

      // store에서 중복값인지 결과 가져온 것 
      storeNicknameCheck: '',
      storeIdCheck: '',


      confirmDirty: false,
      // residences,
      // autoCompleteResult: [],
      // formItemLayout: {
      //   labelCol: {
      //     xs: { span: 24 },
      //     sm: { span: 8 },
      //   },
      //   wrapperCol: {
      //     xs: { span: 24 },
      //     sm: { span: 16 },
      //   },
      // },
      // tailFormItemLayout: {
      //   wrapperCol: {
      //     xs: {
      //       span: 24,
      //       offset: 0,
      //     },
      //     sm: {
      //       span: 16,
      //       offset: 8,
      //     },
      //   },
      // },
    }
  },

  watch : {
    
    changeNick() {
    
      this.checkNickName = false;
      console.log('닉네임 중복체크 하길 바람~');
      // const inputNickClass = document.querySelector('.input-nickname');
      // inputNickClass.classList.add('input-border-red');
      // if(!this.checkNickName){
      //   inputNickClass.style.borderColor = red ;
      // }
      
    },
    changeId(){
      this.checkId = false;
      console.log('아이디 중복체크 하길 바람~');
      // const inputIdClass = document.querySelector('input-id');
  
    },
   
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      // validateFieldsAndScroll
      this.form.validateFields(async(err, values) => {
        if (!err) {
          if(!this.checkNickName){
            this.$message.info('닉네임 중복 검사를 실시해주세요!');
            
          }else if(!this.checkId){
            this.$message.info('아이디 중복 검사를 실시해주세요!');
            
          }else {
            console.log('회원가입 버튼 누름..!',values);
            await this.$store.dispatch('register/registerProcess',{
              name : values.realname,
              nickName : values.nickname,
              id : values.id,
              password : values.password, 
            });

            this.$message.success('회원가입 성공!!');

            this.$router.push({
              path: '/login',
            });

            // console.log('이름 => ',values.realname);
            // console.log('닉네임 => ',values.nickname);
            // console.log('아이디 => ',values.id);
            // console.log('비밀번호 => ', values.password);
            // console.log('이제 서버로 보낸 다음에 로그인 창으로 향하게 만들어주기..! 곧 끝이 보인다..!!이예!');
            // console.log('이제 로그인안하면 글 작성 못하게 만들어 줄 것 ~');

            // console.log('Received values of form: ', values);
          }
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    handleCheckNick(){

    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
    

    async duplicateCheckNickname() {
     
      if(this.changeNick === ''){
        console.log('닉네임을 입력해라!');
      } else { // 닉네임 중복 검사

        await this.$store.dispatch('update/nicknameCheckProcess',{
          changeNickname : this.changeNick
        });
        
        this.storeNicknameCheck = this.$store.state.update.nicknameCheck;

        if(this.storeNicknameCheck){ // this.storeNicknameCheck == true 중복이 아니니 닉네임 변경 가능! 
          this.$message.success('사용가능한 닉네임 입니다.');
          this.checkNickName = true;
        } else {
          this.$message.info('이미 존재하는 닉네임 입니다.');
          this.checkNickName = false;
        }
      }
    },

    async duplicateCheckId(){

      if(this.changeId === ''){
        console.log('아이디를 입력해주세요');
      } else { // 아이디 중복 검사

        await this.$store.dispatch('update/idCheckProcess',{
          changeId: this.changeId
        });
        
        this.storeIdCheck = this.$store.state.update.idCheck;

        if(this.storeIdCheck){ // this.storeIdCheck == true 중복이 아니니 닉네임 변경 가능! 
          this.$message.success('사용가능한 아이디입니다!');
          this.checkId = true;
        } else {
          this.$message.info('이미 존재하는 아이디 입니다.');
          this.checkId = false;
        }
      }
    },

    goToLogin(){
      this.$router.push({
        path: '/login'
      })
    }
  
  },
};
</script>

<style scoped>

  .align-center{
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .form-title h1{
    text-align: center;
    color: rgb(250, 116, 138);
    margin-bottom: 20px;
  }
  .container{
    display: flex;
    justify-content: center; 
  }

  .form-box{
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 30px;
    width: 600px;
    padding: 50px;
    border: 2px solid pink;
  }

  .input-box{
    width: 400px;
    /* display: flex;
    justify-content: center;
    flex-direction: column; */
    margin: 30px;
  }

  .btn-box{
    display: flex;
    justify-content: center;
    /* flex-direction: column; */
    /* flex-wrap: wrap; */  
  }

  .submit-btn{
    background-color:pink;
    border-color: pink;
    
  }
  .submit-btn:hover{
    background-color:white;
    /* border-color: white; */
    color: pink;
  }

  .btn-login{
    text-align: center;
    font-size: 17px;
  }
 

  .input-border-red{
    border-color: red;
  }
  
  .ok-btn,.dupli-btn{
    float: right;
  }  

  .ok-btn{
    color: white;
    background-color:rgb(250, 170, 184);
    border-color: white;
  }

  .dupli-btn:hover{
    color: palevioletred;
    background-color:white;
    border-color: palevioletred;
  }
</style>