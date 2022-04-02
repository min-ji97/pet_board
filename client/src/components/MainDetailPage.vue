<template>
    <div>
        <div class="board-container">

            <div class="part-title" @click="goToMain()" v-if="boardNum === 1"> > 소개합니다 </div>
            <div class="part-title" @click="goToAsk()" v-else-if="boardNum === 2"> > 질문합니다 </div>
            <!-- <div class="part-title" @click="goToAsk()" v-else-if="roomNum === 3"> > 추천합니다 </div> -->

            <table class="table-box">
                <colgroup>
                    <col style="width:10%">
                    <col style="width:20%">
                    <col style="width:40%">
                    <col style="width:10%">
                    <col style="width:10%">
                    <col style="width:10%">
                    
                </colgroup>
                
                <tr class="title-box">
                    <td class="padding-10px" colspan="6">{{title}}</td>
                </tr>
                <tr class="info-box " >
                    <td class="padding-10px" ></td>
                    <td class="padding-10px">{{nickname}}</td>
                    <td class="padding-10px">{{$moment(createAt).format('YYYY-MM-DD a h:mm:ss')}}</td>
                    <td class="padding-10px"><a-icon type="eye" class="view-icon" /> {{viewNum}}</td>
                    <!-- <td v-if="likeStatus"><a-icon type="heart" class="like-icon">좋아요 {{likeNum}}</td>  -->
                   
                    <td class="padding-10px"><a-icon class="no-like-icon" type="heart" @click="heartToggle()"  /> {{likeNum}}</td>

                    <td class="padding-10px"></td>
                   
                   <!-- 좋아요를 누르면 클래스를 추가해줘서 색 변하게 합시다...!! 그게 이쁘고 빠를뜻!! -->

                    <!-- <td>
                        <heart-icon :style="{ color: 'hotpink' }" v-if="likeCheck" />
                        <a-icon type="heart" v-else/>
                        {{likeNum}}
                    </td> -->
                </tr>
                <tr class="content-box">
                    <td colspan="6" class="padding-30px"  v-html="content"> </td>
                </tr>
                <!-- <tr class="content-box">
                    <td colspan="4">
                        <editor-content :editor="editor" />
                    </td>
                </tr> -->   
            </table>

            <div class="comment-container">
                <div class="flex-center">
                    <div class="comment-title">댓글 ( {{this.commentList.length}} )</div>
                    <div class="border-deco"></div>
                </div>
                
                <div class="comment-review">
                    <Comment :commentList="commentList"/>
                    <!-- <Comment :roomNum="roomNum" :contentId="contentId"/> -->
                </div>

                <div class="comment-input">
                    <textarea v-model="inputComment" name="" id="" cols="100" rows="4" maxlength="500"></textarea>
                    <a-button @click="commentBtn" class="comment-btn">댓글</a-button>
                </div>


                <!-- <table class="comment-table">
                    
                    <tbody>
                        <tr>
                            <td>   
                                <textarea name="" id="" cols="100" rows="4"></textarea>  
                            </td>
                            <td>
                                <button class="comment-btn">댓글</button>
                            </td>
                        </tr>
                    </tbody>
                </table> -->



            </div>
            
<!--  임시!! 지우지 말것 위에 테이블이 성공하면 지울 것~~
            <div class="commet-container">
                <div class="comment-review">

                </div>

                <div class="comment-input">
                    <textarea name="" id="" cols="100" rows="4"></textarea>
                    <button class="comment-btn">댓글</button>
                </div>
            </div> -->

        </div>
        
    </div>
</template>

<script>

import { mapState } from 'vuex';
import { Editor, EditorContent } from 'tiptap';
import Comment from '@/components/Comment'
// import StarterKit from 'tiptap/starter-kit'

export default {
    data() {
        const contentId = Number(this.$route.params.contentId);
        const roomNum = Number(this.$route.params.roomNum);

        const userId = this.$store.state.user.user.userId;

        if(roomNum === 1){
            var previewContents = this.$store.state.post.mainContentsPreview;
            var contentData = previewContents.filter(item => item.content_id === contentId)[0];

            var list = this.$store.state.comment.mainComment;
            var commentList = list.filter(item => item.content_id === contentId);

        }else {
            var previewAsk = this.$store.state.post.askContents;
            var contentData = previewAsk.filter(item=> item.content_id === contentId)[0];

            var list = this.$store.state.comment.askComment;
            var commentList = list.filter(item => item.content_id === contentId);
        }
        
        // const like = this.$store.state.like.likeList;
        // c    onst likeCheckList = like.filter(item => item.content_id === contentId 
        // && item.board_num === roomNum && item.user_id === user.user_id)[0];

        
        return{
            editor: null,
            ///content_id , context , nickname , preview_image, title ,create_at , like_num , view_num
            roomNum : roomNum,
            contentdId : contentId,
            title : contentData.title,
            content : contentData.content,
            nickname : contentData.nickname,
            previewImage : contentData.preview_image,
            image : contentData.image,
            createAt : contentData.create_at,
            likeNum : contentData.like_num,
            viewNum : contentData.view_num,

            boardNum : contentData.board_num,

            htmlContent : contentData.content,
            domContent: '',

            likeStatus: false,

            commentList : commentList,
            inputComment: '',

            userId : userId,


            // likeCheckList: likeCheckList,
            // likeCheck : likeCheckList.like_check,
        }
    },
    components: {
        EditorContent,
        Comment,
    },
    computed: {
        ...mapState('post',[
            'mainContentsPreview',
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
    async created(){
        window.scrollTo(0,0);
        window.onload = ()=>{
            setTimeout(()=>{
                scrollTo(0,0);
            },100);
        }

        await this.$store.dispatch('comment/getMainCommentProcess');
        await this.$store.dispatch('comment/getAskCommentProcess');
        
    },
    mounted() {
        this.editor = new Editor({
            content: this.content,
        });

        console.log('넘어온 콘텐츠 아이디 : ',this.contentId);
        console.log('넘어온 룸넘버 : ',this.roomNum);
    
    },

    methods: {
        goToMain() {
            this.$router.push({ path: '/'})
        },
        goToAsk() {
            console.log('아직 구현이 안됨');
        },

        async commentBtn(){
            console.log('댓글 작성 버튼을 눌렀음..!!',this.inputComment);
            console.log('몇번방인지 잘 나옵니까?!?!',this.roomNum);
            console.log(this.contentId,this.userId ,this.inputComment);
            if(this.inputComment===""){
                this.$message.info('댓글을 입력해주세요.');
            }else if(Number(this.roomNum) === 1){ // main Comment에서 작성  
                await this.$store.dispatch('comment/writeMainComment',{
                    contentId : this.contentId,
                    userId : this.userId,
                    context : this.inputComment, 
                });

                this.$message.success('댓글을 입력했습니다.');

                this.$router.go(this.$router.push({name: 'MainDetailPage' }));
           

            }else if(Number(this.roomNum) === 2){ // ask Comment에서 작성 
                await this.$store.dispatch('comment/writeAskComment',{
                    contentId : this.contentId,
                    userId : this.userId,
                    context : this.inputComment, 
                });
                this.$message.success('댓글을 입력했습니다.');
                this.$router.go(this.$router.push({name: 'MainDetailPage'}));

            }else{
                this.$message.warning('이게 뜨면 망합니다!!!!!');
            }
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

    margin: auto;
    margin-bottom: 100px;
    width: 90%;
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
    /* background-color: rgb(233, 221, 221); */
    font-size: 30px;
    /* border: 1px solid black; */
    
    width: 100%;
    /* height: 500px;  임시 */
    margin: 10px 80px 50px 80px;
}

.table-box tr {
    border:1px solid ;
    border-color: rgb(173, 155, 155) white;
}

.table-box tr td {
    margin: 10px;
}

.title-box{
    /* border: 1px solid black; */
    /* border-color : black ; */
    /* background-color: rgb(253, 204, 212); */
    background-color: rgb(243, 232, 232);
    text-align: center;
    font-size: 20px;
    padding: 10px;
}

.info-box{
    /* border: 1px solid black ; */
    /* border-color : black; */
    text-align: center;
    font-size: 20px;
    padding: 10px;
}

.info-box td{
    margin : 10px;
}

.content-box{
    /* border: 1px solid black ; */
    
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

/* 
    댓글!!!!!!!!!
*/



.comment-container{
    display: flex;
    /* justify-content: center; */
    flex-flow: column wrap;
    justify-content: flex-start;
    /* margin: auto; */
    margin-bottom: 200px;
    /* box-sizing: border-box; */
    /* border: 1px solid rgb(216, 0, 0); */
    width: 70%;
    height: 100%;
    background-color:#f3e8e8;
    /* height: 500px; */
    /* margin: 30px; */
     /* 임시 */
    font-size: 20px;
}

.flex-center{
    display: flex;
    /* justify-content: center; */
    /* align-self: flex-start; */
    flex-direction: column;

    /* #f3e8e8 */
}

.comment-title{
    
    align-self: center;
    margin: 20px 0px 20px 0px;
  
}
.border-deco{
    align-self: center;
    width: 70px;
    height: 0px;
    float : left;
    margin: 0px 0px 20px 0px ;
    border: 1px solid rgb(85, 85, 85);
}


.comment-table{
    width: 100%;
    margin: 50px;
    display: flex;
    justify-content: center;

}

.comment-table tbody td:nth-child(1){
    width: 500px;
}

.comment-table tbody td:nth-child(2){
    width: 300px;
}

.comment-review{
    align-self: center;  
    /* box-sizing: border-box;   */
    width: 100%;
    /* height: 200px; */
    /* background-color: rgb(247, 162, 162); */
    /* margin: auto; */
    margin-bottom: 50px ;


}

.comment-input{
    /* position: absolute; */
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 20px;
    width: 90%;
    /* padding: 20px; */
    /* box-sizing: border-box; */
    /* height: 50px; */
    bottom: 0;
    
}

.comment-input textarea{
    
    height: 100px;
    max-height: 200px;
    width: 80%;
    margin-right:10px;
    align-items: center;
}

.comment-btn{
    width: 80px;
    height: 80px;
    float: left;
    background-color: white;
    color: rgb(233, 160, 160);
    border: 1px solid rgb(118, 118, 118);
}
.comment-btn:hover {
    border: 1px solid rgb(243, 147, 147);
    background-color: rgb(243, 147, 147) ;
    color: white;
}

/*  댓글 요기까지임...!

*/

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
 
.padding-10px {
    padding: 10px;
}  
.padding-30px {
    padding : 30px;
}
</style>