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
              <a-form-item label="닉네임" has-feedback>
                  <a-input 
                    v-decorator="[
                      'nickname',
                      {
                        rules: [
                          { required: true, message: 'Please input your nickname!' },
                          {  message: '중복 검사를 실시해주세요...제발뜨면 좋겠따...눈물ㅇ..'}
                        
                        ],
                      },
                      {
                        validator:  checkNickNameFunc
                      },
                    ]"
                    v-model="changeNick"
                    
                    type="name"
                    
                  />
                  <a-button v-if="checkNickName">OK</a-button>
                  <a-button v-else-if="!checkNickName" @click="duplicateCheckNickname()">중복검사</a-button>
                  
              </a-form-item>

              <!-- 아이디  -->
              <a-form-item label="아이디">
                  <a-input 
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
                  <a-button v-if="checkId">OK</a-button>
                  <a-button v-else-if="!checkId" @click="duplicateCheckId()">중복검사</a-button>
              </a-form-item>

              <!-- 비밀번호 -->
              <a-form-item  label="비밀번호" has-feedback>
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
                              validator: checkNickNameFunc,
                            },
                          ],
                        },
                      ]"
                      type="password"
                  />
              </a-form-item>

              <!-- 비밀번호 확인 -->
              <a-form-item  label="비밀번호 확인" has-feedback>
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

export default {
  data() {
    return {
      changeNick:'',  // 입력한 닉네임 (v-model)
      nickName: '동동이',  // 디비에서 중복된 값이 있는지 가져올 녀석..!
      // newNickName : '',
      
      // 중복 검사에 쓰이는 boolean값..!
      checkNickName: '',
      checkId: '',


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
    },
    changeId(){
      this.checkId = false;
    }
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        
        callback('Two passwords that you enter is inconsistent!ggg');
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
    
    checkNickNameFunc(rule, value, callback){
      const form = this.form;
      
      console.log(form.getFieldValue('nickname'));
      console.log('제발 좀 떠줬으면 너무너무 조케따..씨바..')

     
    },


    // checkNickname(rule, value, callback){ // 닉네임 중복 검사
    //   console.log(value);
    //   console.log('닉네임 중복 검사 창입니다.!');
    //   console.log();
      
    //   const form = this.form;
      
    //   callback('띠발..!');
    //   console.log('왜 안돼..?! => ',value);
      

      
    //   console.log(value.nickname);
    


    // },

    duplicateCheckNickname() {
      console.log('씨팔!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      if(this.changeNick === ''){
        console.log('닉네임을 입력해라!');
      }else if(this.nickName === this.changeNick){
        console.log('이미 존재하는 닉네임 입니다..!!~!');
        this.checkNickName = false;

      }else{
        console.log('사용가능한 닉네임입니다..!');
        this.checkNickName = true;

      }

     
      

      // if(!this.changeNickname){
      //           this.$message.info('닉네임을 입력해주세요.');
      //       } else if(this.userNickname === this.changeNickname){
      //           this.$message.info('동일한 닉네임입니다.');
      //       } else {
      //           await this.$store.dispatch('update/nicknameCheckProcess',{
      //               changeNickname : this.changeNickname
      //           });
        
      //           this.nicknameCheck = this.$store.state.update.nicknameCheck;
            
      //           if(this.nicknameCheck){ // this.nicknameCheck == true 중복이 아니니 닉네임 변경 가능! 
      //               this.$message.success('닉네임 변경이 가능합니다!');
      //               this.checkOk = true;
      //           }else{
      //               this.$message.info('중복입니다!!!!!!!!!!!!!!!!!!!!');
      //               this.checkOk = false;
      //           }
      //       }  
      
    },
    async duplicateCheckId(){
       console.log('닉네임..!', this.nickName);

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
    font-size: 18px;
  }
 
 
</style>