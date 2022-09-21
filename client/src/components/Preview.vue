<template>
    <div>
                <!-- <div class="previewImg">image</div> -->
        <div class="previewContainer">
            <div v-for=" content of mainContentsPreview" v-bind:key="content.contentId">
                <div class="previewBox" @click="goToDetailPage(content.content_id , content.board_num)">
                    <img class="previewImg"  alt="" :src="`http://localhost:${port}/images/${content.preview_image}`">
                    <div class="previewText">
                        <div class="pre-title">{{content.title}}</div>
                        <!-- <div>{{content.context}}</div> -->
                        <div class="pre-nickname">{{content.nickname}}</div>
                        <div>
                            <span class="pre-view"><a-icon type="eye"/>{{ content.view_num }}</span>
                            <span class="pre-like"><a-icon type="heart"/>{{ content.like_num }}</span>
                        </div>
                        <!-- <div ><a-icon type="heart" />{{content.like_num}}</div> -->
                        <div class="pre-date">{{$moment(content.create_at).format('YYYY-MM-DD HH:mm')}}</div>
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
            current: 1, 
            port : 3000,
            // likeCheckList: likeCheckList,
            //likeCheck : likeCheckList.like_check,
            likeCheck : 1,
        }
    },
    computed: {
        ...mapState('post',[
            // 'askContents',
            'mainContentsPreview',
        ]),
        ...mapState('user',[
            'user'
        ]),
        // ...mapState('like',[
        //     'likeList'
        // ]),
        ...mapGetters('post',[

        ])
    },
    
    mounted(){
        // 좋아요...추후...할.. 예정...ㅠㅠㅠㅡㅠㅠ
        if(this.likeCheck === 1){ // 빨간 하트 디자인
            const likeClass = document.querySelector('.pre-like i');
            likeClass.classList.add('.like-icon');
        }
    },

    async created(){
        await this.$store.dispatch('post/getMainPostProcess');
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
        // heartToggle(){
        //     console.log('1. likeLis 확인..!',this.likeList);
        //     console.log('2. likeLis 확인..!',this.likeList.likeCheck);
        //     console.log('3. likeLis 확인..!',this.likeCheckList);
        //     console.log('4. likeLis 확인..!',likeCheckList);
        //     // likeCheck이 1일때 클릭 ->  like_num의 수를 -1 시키고 likeChek을 0으로 바꿔줌!!
        //     // likeCheck이 0일때 클릭 -> like_num의 수를 +1 시키고 likeCheck를 1로 바꿔줌!! 
        //     // likeId , userId , likeCheck , contentId , boardNum이 필요하지 않을까 함..!!
            
        //     if(this.likeCheck === 1){ // 좋아요인 상태 -> 취소로 만들것..!
            
        //         //(likeDownProcess)를 실행시키면 서버로 가서 
        //         //mainContentsPreview.like_num를 1만큼 감소 / likeCheck를 0으로 바꿔줌 
        //         await this.$store.dispatch('like/likeDownProcess');
                


        //     }else{// 빈하트 -> 좋아요 상태로 만들 것..!
        //         //(likeUpProcess)를 실행시키면 서버로 가서 mainContentsPreview.like_num를 1만큼 증가 시킨다..!
        //         await this.$store.dispatch('like/likeUpProcess');
        //     }

        // },
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