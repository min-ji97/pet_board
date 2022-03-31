<template>
    <div class="comments">
        <div class="comment-box" v-for="list of commentList" v-bind:key="list.comment_id" >
            <div class="image-box">
                <img class="user-img" v-if="list.user_image" :src="`http://localhost:3000/images/${list.user_image}`" onerror="this.src=``" />
                <a-avatar v-else class="primary-user-img" :size="78" icon="user"  />
            </div>
            <div class="text-box">
                <div class="info-box">
                    <div class="nickname">{{list.nickname}}</div>
                    <div class="date">{{list.create_at}}</div>
                </div>
                <div class="context-box">{{list.context}}</div>
            </div>
        </div>
        
       
        
    </div>
</template>

<script>


export default {
    data() {
        const contentId = Number(this.$route.params.contentId);
        const roomNum = Number(this.$route.params.roomNum);

        if(roomNum === 1) { // 메인 댓글을 불러오기..!
            var list = this.$store.state.comment.mainComment;
            var commentList = list.filter(item => item.content_id === contentId);
        } else {
            var list = this.$store.state.comment.askComment;
            var commentList = list.filter(item => item.content_id === contentId);
        }
        


        return {
            contentId : contentId,
            roomNum : roomNum,

            commentList : commentList,

            // mainCommentList : mainCommentList,
            // askCommentList : askCommentList,
        }
    },
    props:{
        contentId : Number,
        roomNum : Number,
    },
    async created(){
        await this.$store.dispatch('comment/getMainCommentProcess');
        await this.$store.dispatch('comment/getAskCommentProcess');

        
    },
    methods: {

    }
}
</script>

<style scoped>
    .comments{
        display: flex;
        /* justify-content: center; */
        flex-direction: column;
    }
    .comment-box{
        display: flex;
        flex-direction: row;
        align-self: center;
        width : 80%;
        min-height : 120px;
        height: auto;
        background-color : white;
        border: 1px solid;
        border-color: black white;
        box-sizing: border-box;
        padding: 10px;
        /* margin : 10px; */
    }

    .image-box{
        width: 60%;
        margin: 10px;
        border: 1px solid red;
    }
    .text-box{
        width: 70%;
        border: 1px solid red;
        margin: 10px;
        display: flex;
        flex-direction: column;
    }
    .info-box{
        margin: 10px;
        border: 1px solid orange;
    }
    .context-box{
        margin:10px;
        border: 1px solid orange;
    }
</style>
