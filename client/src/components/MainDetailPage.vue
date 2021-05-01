<template>
    <div>
        <div class="part-title" @click="goToMain" v-if="roomNum === 1"> > 소개합니다 </div>
        <div class="part-title" @click="goToAsk()" v-else-if="roomNum === 2"> > 질문합니다 </div>
        <div class="part-title" @click="goToAsk()" v-else-if="roomNum === 3"> > 추천합니다 </div>

        <div class="board-container">
            
            <table class="table-box">
                <tr>
                    <td colspan="4">{{title}}</td>
                </tr>
                <tr>
                    <td>닉네임 {{nickname}}</td>
                    <td>생성일 {{createAt}}</td>
                    <td>조회수 {{viewNum}}</td>
                    <td>좋아요 {{likeNum}}</td>
                </tr>
                <tr>
                    <td colspan="4" v-html="content"> </td>
                </tr>

            </table>
            <div class="commet-container">
                여기는 댓글이 올 부분입니다. 
               
            </div>

        </div>
        
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        const contentId = Number(this.$route.params.contentId);
        const previewContents = this.$store.state.post.mainContentsPreview;
        const contentData = previewContents.filter(item => item.content_id === contentId)[0];
        return{
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
        }
    },
    computed: {
        ...mapState('post',[
            'mainContentsPreview',
        ]),
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
    methods: {
        goToMain() {
            this.$router.push({ path: '/'})
        },
        goToAsk() {
            console.log('아직 구현이 안됨');
        }
        
    }
        

    
}
</script>

<style scoped>
.board-container{
    background-color: cornsilk;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

}
.part-title{
    font-size: 20px;
    float: left;
    margin: 0px 0px 20px 80px;
    font-weight: 400;
    color: gray;
}

.table-box{
    font-size: 30px;
    border: 2px solid #000;
    width: 100%;
    height: 500px;  /* 임시 */
    margin: 10px 80px 50px 80px;
}
.commet-container{
    border: 1px solid rgb(243, 216, 216);
    width  : 100%;
    height: 200px;  /* 임시 */
    font-size: 20px;
}
img {
    width: 50%;
}
 
</style>