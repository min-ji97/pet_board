<template>
    <div>
        <div class="header-box">
            <div class="logo-login-box">
                <div class="logo"  @click="gotoMainPage()">LEGO</div>

                <div class="user" v-if="loginStatus" @click="clickProfile() ">
                    <img class="user-img" v-if="user.userImg" :src="`http://localhost:${port}/images/${userAvatar}`" onerror="this.src=``" />

                    <!-- :src="`/images/${userAvatar}`" "http://localhost:8080/1613228452118.jpg"

                    :src="`${userAvatar}`" 안됨 
                    src="./1612982928920.jpg"  이건 됨
                    :src="require(`${userAvatar}`)" 됨!!!!!!!!!!!!!!!이거임!!!!!!!!!!!!
                    "require(`@/assets/images/stooges/${item.img}.jpg`)
                    -->
                    <!-- 
                        깃 커밋 실험을 위한 주석...!
                     -->
                    <a-avatar v-else class="primary-user-img" :size="78" icon="user"  />    
                    <a-drawer
                        :title="user.nickName"
                        placement="right"
                        :closable="false"
                        :visible="visible"
                        @close="onClose"
                        >
                        <p @click="clickMypage()">내가 쓴 글</p>
                        <div class="tab-box my-page-box">
                            <p @click="gotoHomeTap(1)">home</p>
                            <p @click="gotoLikeTap(1)">QnA</p>
                        </div>  
                        <p @click="clickLikePage()">좋아요</p>
                        <div class="tab-box like-page-box">
                            <p @click="gotoHomeTap(2)">home</p>
                            <p @click="gotoLikeTap(2)">QnA</p>
                        </div>
                        <p @click="gotoUpdatePage()">회원정보 변경</p>
                        <p @click="logout()">로그아웃</p>
                    </a-drawer>
                </div>

                <div class="login" v-else @click="gotoLogin()">LOGIN</div>
            </div>
            <div class="navBar">
                <!-- <div @click="gotoQNA1()" class="router">질문합니다</div> -->

                <span class="router" @click="gotoMainPage()">Home</span>
                <span class="router" @click="gotoQNA()">QnA</span>

                <!-- <router-link :to= "{ name: 'BoardPage' , params: { boardNum : 2 } }" class="router">질문합니다</router-link>
                <router-link :to= "{ name: 'BoardPage' , params: { boardNum : 3 } }" class="router">추천합니다</router-link> -->
            </div>
            
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default{
    data() {
        return {
            port : 3000,
            userAvatar: this.$store.state.user.user.userImg,
            //userAvatar: this.user.userImg,
            visible: false,

            myVisible : 0,
            likeVisible : 0

        }
    },
    
    //  visible: false,   "./1612982928920.jpg"
    // userNickname: this.$store.state.user.user.nickName
    //C:\Vue_project\pet_board_2\server\public\images\1613283892391.jpg


    computed: {
        ...mapState('user', [
            'user',
            'loginStatus',
        ]),
         
    },
    async created() {
         console.log('==============라이프 사이클 : created   ================');
         await this.$store.dispatch('post/getAskPostProcess');
     },
    updated() {
        console.log('================ 라이프 사이클 : updated ================');
        console.log('user 정보는?! =? ',this.user);
        console.log('user 정보는?! =? ',this.loginStatus);
    },
   
    methods: {
        gotoMainPage() {
            this.$router.replace({
                name: 'MainPage',
            });
            console.log("로고를 클릭했음");
            console.log("유저정보를 잘 받아 왔니??", this.user);
            console.log("로그인 상태는 true인가 false인가ㅏ",this.loginStatus);
        },
        // gotoQNA1(){
        //     console.log("자 1번방이다");
        //     this.$router.push({
        //         name: 'MainPage',
        //         params: {
        //             boardNum : 1
        //         }
        //     });
            
        // },
         gotoQNA() {
            this.$router.replace({
                name: 'BoardPage',
            });
        
        },
        // gotoQNA(){
        //     console.log("자 2번방이다");
        //     this.$router.push({
        //         name: 'BoardPage'
        //     });
            
        // },
        gotoLogin(){
            this.$router.push({
                path: '/login'
            })
        },
        clickProfile(){
            this.visible = true;
            
          
        },
        clickMypage(){
            if(this.myVisible === 0){
                //tab 보여주기
                document.querySelector('.my-page-box').style.display = "block";
                this.myVisible = 1;
            }else { // num이 1이므로 tab 닫아주기
                document.querySelector('.my-page-box').style.display = "none";
                this.myVisible = 0;
            }
        },
        
        clickLikePage(){
            if(this.likeVisible === 0){
                //tab 보여주기
                document.querySelector('.like-page-box').style.display = "block";
                this.likeVisible = 1;
            }else { // num이 1이므로 tab 닫아주기
                document.querySelector('.like-page-box').style.display = "none";
                this.likeVisible = 0;
            }

        },
        gotoHomeTap(num) { // Home 내가 쓴 게시글 + 좋아요 글
            this.visible = false;
            this.$router.push({
                name:'TapHome',
                params: { roomNum : num }  // 1 번이면 내가 쓴 게시글 2번이면 좋아요
            })
        },
        gotoLikeTap(num){ // Ask 내가 쓴 게시글 + 좋아요 글
            this.visible = false;
            this.$router.push({
                name:'TapAsk',
                params: { roomNum : num }  // 1번이면 내가 쓴 게시글 2번이면 좋아요
            })
           
        },
        gotoUpdatePage(){ // 변경 페이지 
            this.visible = false;
            this.$router.push({
                path: '/update-page',
            })
        },

        onClose() {
            this.visible = false;
        },

        logout() {  
            this.visible = false;
            console.log('로그아웃 버튼을 클릭함');
            this.$store.dispatch('user/logoutProcess');  
            this.$router.push({path:'/',}); 
        }
    
       
    }
    
}
</script>

<style scoped>
    .header-box{
        margin-bottom : 50px;   
    }
    .logo-login-box{
        display: flex;
        width: 98%;

    }   
    .logo {
        font-size: 60px;
        font-weight : bold;
        color: pink;
        text-align: center;
        width: 90%;
        margin-left: 13%;
        text-shadow: 3px 1px rgb(255, 122, 122);
    }
    .login{
        width: 10%;
        padding: 10px;
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        margin-top:20px;
        color: pink;
    }
    .login:hover {
        background-color: pink;
        color: white;
    }
    .user{
        width: 10%;
        margin: 10px;
        padding: 10px;
    }
    .user-img{
        width: 100px;
        height: 100px;
        border-radius: 50px; 
        object-fit: cover;
       
   
    }
    .primary-user-img{
        background-color: pink;
    }
    .navBar{
        margin-left:30px;
        margin-top: 20px;
        text-align: center;
        font-size: 20px;
        /* text-decoration:  */
    }
    .router{
        font-size: 20px;
        margin:10px;
        padding: 10px;
        /* font-weight: bold; */
        color:pink;
        text-decoration: none;
    }
    .router:hover{
        color: rgb(255, 122, 122);
      
    }


    .ddd{
        display: none;
    }

    .tab-box{
        display: none;
        box-sizing: border-box;
        margin : 10px 0px 10px 40px;
    }
    
</style>