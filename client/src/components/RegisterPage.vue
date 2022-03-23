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
              
              <a-form-item v-bind="formItemLayout" >
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
              <a-form-item v-bind="formItemLayout"  label="닉네임" has-feedback>
                  <a-input 
                      v-decorator="[
                      'nickname',
                      {
                          rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                      },
                      {
                        validator: checkNickname,
                      },
                      
                      ]"
                      type="name"
                      
                  />
                  <a-button @click="duplicateCheckNickname()">중복검사</a-button>
                  
              </a-form-item>

              <!-- 아이디  -->
              <a-form-item v-bind="formItemLayout"  label="아이디">
                  <a-input 
                      v-decorator="[
                      'id',
                      {
                          rules: [{ required: true, message: 'Please input your id!', whitespace: true }],
                      },
                      ]"
                  />
                  <a-button @click="duplicateCheckId()">중복검사</a-button>
              </a-form-item>

              <!-- 비밀번호 -->
              <a-form-item v-bind="formItemLayout" label="비밀번호" has-feedback>
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
              <a-form-item v-bind="formItemLayout" label="비밀번호 확인" has-feedback>
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
                <a-form-item v-bind="tailFormItemLayout">
                  <a-button type="primary" html-type="submit">
                      Register
                  </a-button>
                  <span>login btn..!!</span>
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
      nickName: '어랏 왜 안찍히지',
      dhkdlfksh: 1,

      confirmDirty: false,
      residences,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    }
  },
  
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' });
  },
  methods: {
    handleSubmit(e) {
       console.log('흑흐긓ㄱ', this.nickName);
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
        
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      console.log(value);
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
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
      console.log('닉네임..!', this.nickName);
      console.log('닉네임..!', this.dhkdlfksh);

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

 
 
</style>