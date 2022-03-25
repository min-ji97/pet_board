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
              <a-form-item label="닉네임">
                  <a-input class="input-nickname" ref="inputNickname"
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
                  <a-button v-if="checkNickName">OK</a-button>
                  <a-button v-else-if="!checkNickName" @click="duplicateCheckNickname()">중복검사</a-button> 
             </a-form-item>

              <!-- 중복 버튼을 폼 아이템으로 따로 빼보도록 합시다..... -->
              <!-- <a-form-item>
                <a-button v-if="checkNickName">OK</a-button>
                <a-button v-else-if="!checkNickName"  has-feedback
                  v-decorator="[
                    'btn-nick', 
                    {
                      rules:[
                        {
                          validator: checkNickNameBtn
                        }
                      ]
                    }
                  ]"
                
                @click="duplicateCheckNickname()">중복검사</a-button>  
              </a-form-item> -->
              
              <!-- 아이디  -->
              <a-form-item label="아이디">
                  <a-input class="input-id" ref="inputId"
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
                              validator: validateToNextPassword,
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

// const inputNickClass = document.querySelector('.input-nickname');
// const inputIdClass = document.querySelector('.input-id');



export default {
  
  data() {
  
    return {


      changeNick:'',  // 입력한 닉네임 (v-model)
      changeId: '', // 입력한 아이디 (v-model)
      
      
      nickName: '동동이',  // 디비에서 중복된 값이 있는지 가져올 녀석..!
      
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
      const inputNickClass = this.$ref.inputNickname;
      const inputIdClass = this.$ref.inputId;
      
      console.log(inputNickClass);
      this.checkNickName = false;
      console.log('닉네임 중복체크 하길 바람~');
      // const inputNickClass = document.querySelector('.input-nickname');
      // inputNickClass.classList.add('input-border-red');
      if(!this.checkNickName){
        inputNickClass.style.borderColor = red ;
      }
      
    },
    changeId(){
      this.checkId = false;
      console.log('아이디 중복체크 하길 바람~');
      // const inputIdClass = document.querySelector('input-id');
      inputIdClass.classList.add('.input-border-red');
    },
   
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        // const inputNickClass = document.querySelector('.input-nickname');
        // const inputIdClass = document.querySelector('input-id');
        if (!err) {
          if(!this.checkNickName){
            console.log('닉네임 중복 검사를 실시해주세요!');
            inputNickClass.classList.add('input-border-red');
          }else if(!this.checkId){
            console.log('아이디 중복 검사를 실시해주세요!');
            inputIdClass.classList.add('input-border-red');
          }else {// 다 제대로 잘 작성 된 것일듯..??
            console.log('이름 => ',values.realname);
            console.log('닉네임 => ',values.nickname);
            console.log('아이디 => ',values.id);
            console.log('비밀번호 => ', values.password);
            console.log('이제 서버로 보낸 다음에 로그인 창으로 향하게 만들어주기..! 곧 끝이 보인다..!!이예!');
            console.log('이제 로그인안하면 글 작성 못하게 만들어 줄 것 ~');

            console.log('Received values of form: ', values);
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
    
    // 잠시 주석처리.................................................!!!
    // checkNickName(rule, value, callback){
    
    //   if(this.checkNickName){
    //     callback();
    //   }else{
    //     callback('중복체크를 해주세요..!');
    //   }
    // },



    // checkNickNameBtn(rule, value, callback){
    //   callback();
    // },


    // checkNickname(rule, value, callback){ // 닉네임 중복 검사
    //   console.log(value);
    //   console.log('닉네임 중복 검사 창입니다.!');
    //   console.log();
      
    //   const form = this.form;
      
    //   callback('띠발..!');
    //   console.log('왜 안돼..?! => ',value);
      

      
    //   console.log(value.nickname);
    


    // },

    async duplicateCheckNickname() {
     
      if(this.changeNick === ''){
        console.log('닉네임을 입력해라!');
      } else { // 닉네임 중복 검사

        await this.$store.dispatch('update/nicknameCheckProcess',{
          changeNickname : this.changeNick
        });
        
        this.storeNicknameCheck = this.$store.state.update.nicknameCheck;

        if(this.storeNicknameCheck){ // this.storeNicknameCheck == true 중복이 아니니 닉네임 변경 가능! 
          this.$message.success('닉네임 변경이 가능합니다!');
          this.checkNickName = true;
        } else {
          this.$message.info('이미 존재하는 닉네임 입니다.');
          this.checkNickName = false;
          inputNickClass.classList.remove('input-border-red');
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
          inputIdClass.classList.remove('input-border-red');
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
    font-size: 18px;
  }
 

  .input-border-red{
    border-color: red;
  }
 
</style>