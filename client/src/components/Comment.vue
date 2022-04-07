<template>
    <div class="comments">
        <div class="comment-box" v-for="list of commentList" v-bind:key="list.comment_id" >
            <div class="image-box">
                <img class="user-img" v-if="list.user_image" :src="`http://localhost:3000/images/${list.user_image}`" onerror="this.src=``" />
                <a-avatar v-else class="primary-user-img" :size="78" icon="user"  />
            </div>
            <div class="text-box">
                <div class="info-box">
                    <div class="nick-name">{{list.nickName}}</div>
                    <div class="date">{{$moment(list.create_at).format('YYYY-MM-DD h:mm:ss')}}</div>
                    <div v-if="list.user_id===userId ? true : false " class="delete-btn" >
                        <a-icon type="delete" @click="postDelete()" />       
                    </div>
                </div>
                <div class="context-box">{{list.context}}</div>
            </div>
        </div>
    
       
        
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    data() {

        // const contentId = Number(this.$route.params.contentId);
        // const roomNum = Number(this.$route.params.roomNum);

        // if(roomNum === 1) { // 메인 댓글을 불러오기..!
        //     var list = this.$store.state.comment.mainComment;
        //     var commentList = list.filter(item => item.content_id === contentId);
        //     console.log('룸넘버가 1입니다. => ',list,' => ',commentList);
        //     console.log('댓글이 몇개인지 어떻게 구할까여 => ', commentList.length);
        // }else {
        //     var list = this.$store.state.comment.askComment;
        //     var commentList = list.filter(item => item.content_id === contentId);
        //     console.log('룸넘버가 2입니다. => ',list,' => ',commentList);
        // }
        
         const userId = this.$store.state.user.user.userId;



        return {
            myWriteBoolean : '',

            usesrId : userId,

            // contentId : contentId,
            // roomNum : roomNum,

            // commentList : commentList,

            // mainCommentList : mainCommentList,
            // askCommentList : askCommentList,
        }
    },
    computed: {
        ...mapState('comment',[
            'mainComment',
            'askComment'
        ])
    },
    props:{
        // contentId : Number,
        // roomNum : Number,
        commentList : Array
    },
    async created(){
        // await this.$store.dispatch('comment/getMainCommentProcess');
        // await this.$store.dispatch('comment/getAskCommentProcess');

        
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
        width: 16%;
        margin: 10px;
        /* border: 1px solid red; */
    }
    .text-box{
        width: 100%;
        /* border: 1px solid red; */
        margin: 10px;
        display: flex;
        flex-direction: column;
    }
    .info-box{
        margin-left: 20px;
        display: flex;
        /* justify-content: space-between; */

        /* border: 1px solid orange; */
        /* font-size:10px; */

    }
    .info-box .nick-name{
        font-size: 20px ;
    }
    .info-box .date{
        font-size: 13px ;
        margin-left: 10px;
    }
    .context-box{
        /* margin: 10px; */
        font-size: 24px;
        /* border: 1px solid orange; */
        box-sizing: border-box;
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
</style>
