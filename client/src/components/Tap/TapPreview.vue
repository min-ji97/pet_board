<template>
    <div>
                <!-- <div class="previewImg">image</div> -->
        <div class="previewContainer">
            <div v-for=" content of contentList" v-bind:key="content.contentId">
                <div class="previewBox" @click="goToDetailPage(content.content_id , content.board_num)">
                    <img class="previewImg"  alt="" :src="`http://localhost:${port}/images/${content.preview_image}`">
                    <div class="previewText">
                        <div class="pre-title">{{content.title}}</div>
                        <!-- <div>{{content.context}}</div> -->
                        <div class="pre-nickname">{{content.nickname}}</div>
                        <div>
                            <span class="pre-view"><a-icon type="eye"   />{{ content.view_num }}</span>
                            <span class="pre-like"><a-icon type="heart" />{{ content.like_num }}</span>
                        </div>
                        <!-- <div ><a-icon type="heart" />{{content.like_num}}</div> -->
                        <div class="pre-date">{{$moment(content.create_at).format('YYYY-MM-DD a h:mm:ss')}}</div>
                        <!-- 
                            content.userId === user.userId -> 
                         -->
                    </div>
                </div>
            </div>
            <!-- <a-pagination v-model="current" :total="mainContentsPreview.length" show-less-items />  좀 더 고민...-->
        </div>
    </div>
</template>

<script>

import { mapState ,mapGetters} from 'vuex'

export default{
    data() {
        // const likeCheckList = likeList.filter(item => item.content_id === mainContentsPreview.content_id 
        // && item.board_num === 1 && item.user_id === user.user_id);
        return {  
            // userId : this.$store.state.user.user.userId,
            current: 1, 
            port : 3000,
            likeCheck : 1,
        }
    },
    computed: {
        ...mapState('tap',[
            'homeWriteContents',
            'homeLikeContents',
        ]),
        ...mapState('user',[
            'user'
        ]),

        ...mapGetters('post',[

        ])
    },
    props: {
        roomNum : {
            type : Number
        }
    },
    mounted(){
        // 좋아요...추후...할.. 예정...ㅠㅠㅠㅡㅠㅠ
        if(this.likeCheck === 1){ // 빨간 하트 디자인
            const likeClass = document.querySelector('.pre-like i');
            likeClass.classList.add('.like-icon');
        }

        console.log('유저 아이디..! => ',this.user.userId);
        // console.log('룸넘버가... 잘 찍히는지 볼까여...1',this.roomNum);
        // console.log('룸넘버가... 잘 찍히는지 볼까여...2',roomNum);
    },

    async created(){

        //내가 쓴 글 : Home 
        await this.$store.dispatch('tap/tapHomeWriteProcess',{
            userId : this.user.userId
        }); 
        console.log('home-내가 쓴 글 잘 받아왔나여 => ',this.homeWriteContents);
        // 좋아요 : Home
        //await this.$store.dispatch('tap/tapHomeLikeProcess'); // 좋아요가 아직 구현이 덜 됨.....ㅠ
    },

    methods: {
        
        goToDetailPage(content_id ,board_num){
            this.$store.dispatch('post/viewUpProcess',{ // 조회수 1 올리기
                contentId : content_id,
                boardNum : board_num
            }); 
            this.$router.push({
                name: 'MainDetailPage',
                params: {
                    contentId : content_id,
                    roomNum : board_num
                }
            });
        },

    }
}
</script>

<style scoped>
    .previewContainer{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        /* flex-direction: row; */
        margin: 10px;
        width: 100%;
        height: 100%; 
    }
    .previewBox{
        margin: 60px 10px;
        width: 400px;
        height: 400px;
    }
    .previewImg{
        width: 100%;
        height: 90%;
        border: 1px solid rgb(216, 213, 213);
        object-fit: cover;
    }
    .previewText{
        width: 100%;
        /* height: 30%;     */
        border: 1px solid rgb(216, 213, 213);
        border-top: none;
        text-align: center;
        font-size : 17px;
    }
    .previewText .pre-title{
        font-size: 20px;
        font-weight: bold;
        /* color: black; */
        overflow: hidden;  /* 넘치는거 안보이게  */
        text-overflow: ellipsis; /* ...으로 대체 */
        white-space: nowrap; /* 줄넘김 없음 */
    }
    .pre-view{
        margin-right: 30px;
    }
    .pre-view i, .pre-like i{
        margin-right: 5px;
    }
    .like-icon{
    /* margin-right: 20px; */
    color:brown;
}
</style>