<template>
    <div class="login-container" >
        <div class="login-box">
            <a-form
                id="components-form-demo-normal-login"
                :form="form"
                class="login-form"
                @submit="handleSubmit"
            >
                <a-form-item>
                    <a-input
                        v-decorator="[
                        'id',
                        { rules: [{ required: true, message: 'ID를 입력해주세요.' }] },
                        ]"
                        placeholder="ID"
                    >
                        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-input
                        v-decorator="[
                        'password',
                        { rules: [{ required: true, message: '비밀번호를 입력해주세요.' }] },
                        ]"
                        type="password"
                        placeholder="Password"
                    >
                        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <!-- <a-checkbox
                        v-decorator="[
                        'remember',
                        {
                            valuePropName: 'checked',
                            initialValue: true,
                        },
                        ]"
                    >
                        Remember me
                    </a-checkbox> -->
                    <a class="login-form-forgot" href="#">
                        Forgot password
                    </a>
                    <a-button type="primary" html-type="submit" class="login-form-button" id="button-color">
                        Log in
                    </a-button>
                    Or
                    <!-- <a href="#" @click="goToRegister()">
                        register now!
                    </a> -->
                    <span @click="goToRegister()" > register now! </span>
                </a-form-item>
            </a-form>
        </div>
        
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            
        }
    },
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'normal_login' });
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields(async(err, values) => {
                if (!err) {
                    // this.$store.state.user.loginLoading = true;
                    await this.$store.dispatch('user/loginProcess',{
                        id : values.id,
                        password : values.password,
                        ddd : values.remember,
                    });
                    if (this.$store.state.user.loginStatus) {
                        
                        this.$message.success('로그인에 성공하셨습니다!');
                        this.$router.push({ name : 'MainPage' });
                    } else {
                        this.$message.warning('아이디 또는 비밀번호가 일치하지 않습니다.');
                    }
                }
            });
        },
        goToRegister(){
            this.$router.push({ name: 'RegisterPage'});

        },
    },
}
                                                                                                                                                
// this.form.validateFields(async (err, values) => {
//         if (!err) {
//           this.$store.state.auth.loginLoading = true;
//           await this.$store.dispatch('auth/loginProcess', {
//             nickName: values.nickName,
//             password: values.password,
//           });
//           this.$store.state.auth.loginLoading = false;
//           if (this.$store.state.auth.loginStatus) {
//             this.$router.push({ name: 'LocalNewsTab' });
//           } else {
//             this.$message.warning('아이디 또는 비밀번호가 일치하지 않습니다.');
//           }
//         }
//       });

</script>

<style>
   
    .login-container{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin-left: 20px;
        
    }
    .login-box{
        padding:30px;
        border: 2px solid pink;
        width: 400px;
        height: 300px;
        margin-left: 30px;
    }
     #components-form-demo-normal-login .login-form {
        max-width: 300px;
    }
    #components-form-demo-normal-login .login-form-forgot {
        float: right;
    }
    #components-form-demo-normal-login .login-form-button {
        width: 100%;
    }
    #button-color{
        /* border-width: solid; */
        border: 2px solid pink;
        background: pink;
    }

</style>    