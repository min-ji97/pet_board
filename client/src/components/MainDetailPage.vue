<template>
    <div>
        <div class="board-container">

            <div class="part-title" @click="goToMain()" v-if="roomNum === 1"> > 소개합니다 </div>
            <div class="part-title" @click="goToAsk()" v-else-if="roomNum === 2"> > 질문합니다 </div>
            <!-- <div class="part-title" @click="goToAsk()" v-else-if="roomNum === 3"> > 추천합니다 </div> -->

            <table class="table-box">
                <colgroup>
                    <col style="width:30%">
                    <col style="width:30%">
                    <col style="width:20%">
                    <col style="width:20%">
                </colgroup>
                
                <tr class="title-box">
                    <td colspan="4">{{title}}</td>
                </tr>
                <tr class="info-box">
                    <td>{{nickname}}</td>
                    <td>{{$moment(createAt).format('YYYY-MM-DD a h:mm:ss')}}</td>
                    <td><a-icon type="eye" class="view-icon" /> {{viewNum}}</td>
                    <!-- <td v-if="likeStatus"><a-icon type="heart" class="like-icon">좋아요 {{likeNum}}</td>  -->
                   
                    <td><a-icon class="no-like-icon" type="heart" @click="heartToggle()"  /> {{likeNum}}</td>
                   
                   <!-- 좋아요를 누르면 클래스를 추가해줘서 색 변하게 합시다...!! 그게 이쁘고 빠를뜻!! -->

                    <!-- <td>
                        <heart-icon :style="{ color: 'hotpink' }" v-if="likeCheck" />
                        <a-icon type="heart" v-else/>
                        {{likeNum}}
                    </td> -->
                </tr>
                <tr class="content-box">
                    <td colspan="4" class="padding-30px"  v-html="content"> </td>
                </tr>
                <!-- <tr class="content-box">
                    <td colspan="4">
                        <editor-content :editor="editor" />
                    </td>
                </tr> -->

                

            </table>
            <div class="commet-container">
                여기는 댓글이 올 부분입니다. 
               
            </div>

        </div>
        
    </div>
</template>

<script>

import { mapState } from 'vuex';
import { Editor, EditorContent } from 'tiptap';
// import StarterKit from 'tiptap/starter-kit'

export default {
    data() {
        const contentId = Number(this.$route.params.contentId);
        const roomNum = Number(this.$route.params.roomNum);

        if(roomNum === 1){
            var previewContents = this.$store.state.post.mainContentsPreview;
            var contentData = previewContents.filter(item => item.content_id === contentId)[0];
        }else {
            var previewAsk = this.$store.state.post.askContents;
            var contentData = previewAsk.filter(item=> item.content_id === contentId)[0];
        }
        
        // const like = this.$store.state.like.likeList;
        // const likeCheckList = like.filter(item => item.content_id === contentId 
        // && item.board_num === roomNum && item.user_id === user.user_id)[0];

        
        return{
            editor: null,
            ///content_id , context , nickname , preview_image, title ,create_at , like_num , view_num
            contentdId : contentId,
            title : contentData.title,
            content : contentData.content,
            nickname : contentData.nickname,
            previewImage : contentData.preview_image,
            image : contentData.image,
            createAt : contentData.create_at,
            likeNum : contentData.like_num,
            viewNum : contentData.view_num,

            htmlContent : contentData.content,
            domContent: '',

            likeStatus: false,


            // likeCheckList: likeCheckList,
            // likeCheck : likeCheckList.like_check,
        }
    },
    components: {
        EditorContent,
    },
    computed: {
        ...mapState('post',[
            // 'mainContentsPreview',
        ]),
        // ...mapState('like',[
        //     'likeList'
        // ]),
        // ...mapGetters('post',[
        //     'mainViewLoad',
        //     'askViewLoad'
        // ])
    },
    props:{
        contentId : {
            type: Number,
        },
        roomNum : {
            type: Number,
        }
    },
    create(){
        console.log(' =>', this.nickname);
    },
    mounted() {
    this.editor = new Editor({
      content: this.content,
    })
  },

    methods: {
        goToMain() {
            this.$router.push({ path: '/'})
        },
        goToAsk() {
            console.log('아직 구현이 안됨');
        },



// const like = this.$store.state.like.likeList;
        // const likeCheckList = like.filter(item => item.content_id === contentId 
        // && item.board_num === roomNum && item.user_id === user.user_id)[0];

        // async heartToggle(){
            
        //     console.log('likeList=>',this.likeList);
            
        //     // const like = this.likeList;
        //     const likeListFilter = this.likeList.filter(item => item.content_id === 1 
        //     && item.board_num === 1 && item.user_id === 1)[0];

        //     console.log('likeCheckList=>',likeListFilter);
        //     console.log('list.check =>',likeListFilter.like_check);

        //     // console.log('4. likeLis 확인..!',this.likeCheckList.like_check);
        //     // likeCheck이 1일때 클릭 ->  like_num의 수를 -1 시키고 likeChek을 0으로 바꿔줌!!
        //     // likeCheck이 0일때 클릭 -> like_num의 수를 +1 시키고 likeCheck를 1로 바꿔줌!! 
        //     // likeId , userId , likeCheck , contentId , boardNum이 필요하지 않을까 함..!!
            
        //     // const likeClass = document.querySelector('.no-like-icon');



        //     // likeClass.addEventListener('click',()=>{
        //     //     if(likeListFilter.like_check === 1){ // 좋아요인 상태 -> 취소로 만들것..!
            
        //     //     //(likeDownProcess)를 실행시키면 서버로 가서 
        //     //     //mainContentsPreview.like_num를 1만큼 감소 / likeCheck를 0으로 바꿔줌 
                
        //     //     // await this.$store.dispatch('like/likeDownProcess'); 

        //     //     likeClass.classList.remove('.like-icon');
        //     // }else{// 빈하트 -> 좋아요 상태로 만들 것..!
        //     //     //(likeUpProcess)를 실행시키면 서버로 가서 mainContentsPreview.like_num를 1만큼 증가 시킨다..!
        //     //     // await this.$store.dispatch('like/likeUpProcess');
        //     //     //성공해서 결과를 받으면 like-icon을 추가하도록 해주는거야..!!! 굿아이디어엿따
        //     //     likeClass.classList.add('.like-icon');
        //     // }

        //     // });
            

        // },
        
    },

    beforeDestroy() {
        this.editor.destroy()
    },
        

    
}
</script>

<style scoped>
.board-container{
    
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

}
.part-title{
    font-size: 20px;
    float: left;
    margin: 0px 0px 20px 0px;
    font-weight: 400;
    color: gray;
}

.table-box{
    background-color: #fffdf4;
    font-size: 30px;
    border: 1px solid black;
    width: 100%;
    /* height: 500px;  임시 */
    margin: 10px 80px 50px 80px;
}
.table-box tr td{
    padding: 10px;
}
.title-box{
    border: 1px solid black;
    text-align: center;
    font-size: 20px;
    padding: 10px;
}

.info-box{
    border: 1px solid black;
    text-align: center;
    font-size: 20px;
    padding: 10px;
}

.content-box{
    border: 1px solid black;
    /* text-align: center; */
    font-size: 20px;
    vertical-align: top;
    height: 500px;
    /* padding: 20px; */
}



.content-box td h3 img{
    max-width: 50%;
    max-height: 50%;

}


.commet-container{
    border: 1px solid rgb(243, 216, 216);
    width: 100%;
    /* margin: 30px; */
    height: 200px;  /* 임시 */
    font-size: 20px;
}

.view-icon{
    margin-right: 20px;

}

.like-icon{
    /* margin-right: 20px; */
    color:brown;
}

.no-like-icon{
    /* 여기는 좋아요 안한 상태! 빨간 하트면 안됨! 걍 해보느거임 */
    margin-right: 20px;
    /* color:brown; */
}
/* img {
    width: 50%;
} */
 
 .padding-30px{
    padding:30px;
 }
</style>